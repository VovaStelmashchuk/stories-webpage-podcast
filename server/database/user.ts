import { Document, Schema } from 'mongoose';
import db from './db';
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  password: string;
  sessions: Array<{
    sessionId: string;
    createdAt: Date;
    expiresAt: Date;
  }>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  sessions: [{
    sessionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  }],
});

const User = db.model<IUser>('User', UserSchema, 'users');

function generateSessionId() {
  const count = 64;
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < count; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export async function addSessionToUser(username: string): Promise<string> {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error('User not found');
  }

  const sessionId = generateSessionId();

  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  user.sessions.push({
    sessionId,
    createdAt: new Date(),
    expiresAt,
  });

  await user.save();

  return sessionId;
}

export async function createUser(username: string, password: string): Promise<IUser | null> {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  const user = new User({
    username: username,
    password: hash,
  });

  await user.save();

  return user;
}

export function getUserByUserName(username: string): Promise<IUser | null> {
  return User.findOne({ username: username }).exec();
}