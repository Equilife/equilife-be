import axios from 'axios';
import prisma from '../../core/config/prismaClient';
import config from '../../core/config';

interface AssessmentInput {
    personalData: {
        date_of_birth: Date;
        height: number; // dalam cm
        weight: number; // dalam kg 
        gender: 'Male' | 'Female' | string;
        job_type: string;
        expense_plan: number;
    };

    healthProfile: {
        important_habits: string[];
        obstacles: string[];
        long_term_goals: string;
    };
    workoutProfile: {
        workout_goal: string;
        weekly_activity: string[];
    };
}

export const createAssessment = async (userId: string, data: AssessmentInput) => {
    const { personalData, healthProfile, workoutProfile: partialWorkoutProfile } = data;

    interface GeneratedWorkoutProfile {
        schedule: Array<{
            days: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
            hours: string; // format HH:MM
        }>;
        workout_reminder: number; // dalam menit
        target: {
            metrics: 'kg' | 'time' | 'session' | string;
            value: number;
        };
    }
    
    // let generatedWorkoutProfile: GeneratedWorkoutProfile;
    // try {
    //     const response = await axios.post(config.aiApiUrl, {
    //         workout_goal: partialWorkoutProfile.workout_goal,
    //         weekly_activity: partialWorkoutProfile.weekly_activity
    //     });
    //     generatedWorkoutProfile = response.data as GeneratedWorkoutProfile;
    // } catch (error) {
    //     console.error("Error calling AI API:", error);
    //     throw new Error("Failed to generate workout plan from AI service.");
    // }

    const newAssessment = await prisma.assessment.create({
        data: {
            userId: userId,
            ...personalData,
            long_term_goals: healthProfile.long_term_goals,

            important_habits: {
                create: healthProfile.important_habits.map(habit => ({ name: habit }))
            },
            obstacles: {
                create: healthProfile.obstacles.map(obstacle => ({ name: obstacle }))
            },
            weekly_activity: {
                create: partialWorkoutProfile.weekly_activity.map(activity => ({ name: activity }))
            },
            
            workout_goal: partialWorkoutProfile.workout_goal,
            schedule: '',
            workout_reminder: 0,
            target: {
                metrics: 'kg',
                value: 0
            }
        }
    });

    return newAssessment;
};