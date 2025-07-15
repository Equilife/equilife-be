import prisma from '../../core/config/prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
//import { User } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'zhafranganteng123';

const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '1d',
  });
};

export const registerUser = async (email: string, pass: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  //ganti ke fe nanti
  const hashedPassword = await bcrypt.hash(pass, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { success: true, message: `User ${user.email} registered successfully.` };
};

export const loginUser = async (email: string, pass:string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email.');
  }

  //ganti ke fe nanti
  const isPasswordValid = await bcrypt.compare(pass, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password.');
  }

  const token = generateToken(user.id);

  return { 
    success: true, 
    message: 'Login successful.',
    data: {
      token,
      user: {
        id: user.id,
        email: user.email
      }
    }
  };
};