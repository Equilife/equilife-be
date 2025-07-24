import config from '../../core/config';
import axios from 'axios';
import prisma from '../../core/config/prismaClient';

const APP_NAME = 'nutritional_coach_agent';

export const handleChatMessage = async (userId: string, sessionId: string, messageText: string) => {
    const messageCount = await prisma.chatMessage.count({
        where: { sessionId: sessionId },
    });

    if (messageCount === 0) {
        console.log(`First message in session ${sessionId}. Setting initial state...`);

        const assessment = await prisma.assessment.findUnique({
            where: { userId: userId },
        });

        if (!assessment) {
            throw new Error("User has not completed the assessment yet. Cannot start chat.");
        }

        const stateEndpoint = `${config.aiApiUrl}apps/${APP_NAME}/users/${userId}/sessions/${sessionId}`;
        const sessionState = {
            state: {
                height: assessment.height,
                weight: assessment.weight,
                gender: assessment.gender,
                mainGoal: assessment.long_term_goals
            }
        };

        try {
            await axios.post(stateEndpoint, sessionState);
            console.log(`Successfully set initial state for session: ${sessionId}`);
        } catch (error) {
            console.error("Error setting initial agent state:", error);
            throw new Error("Failed to initialize chat session with the agent.");
        }
    }

    const inferenceEndpoint = `${config.aiApiUrl}run`;
    const agentPayload = {
        appName: APP_NAME,
        userId: userId,
        sessionId: sessionId,
        newMessage: {
            role: 'user',
            parts: [{ text: messageText }]
        }
    };
    
    let agentResponse;
    try {
        const response = await axios.post(inferenceEndpoint, agentPayload);
        const data = response.data as { parts: { text: string }[] };
        agentResponse = data.parts[0].text;
    } catch (error) {
        console.error("Error calling Agent API for inference:", error);
        throw new Error("Failed to get response from agent.");
    }

    await prisma.$transaction(async (tx) => {
        await tx.chatSession.upsert({
            where: { id: sessionId },
            update: {},
            create: { id: sessionId, userId: userId }
        });
        await tx.chatMessage.create({
            data: { sessionId: sessionId, role: 'user', text: messageText }
        });
        await tx.chatMessage.create({
            data: { sessionId: sessionId, role: 'model', text: agentResponse }
        });
    });
    
    return { role: 'model', text: agentResponse };
};