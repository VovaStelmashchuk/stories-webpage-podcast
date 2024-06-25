import { Document, Schema } from 'mongoose';
import db from './db';
import bcrypt from "bcrypt";

interface IUserFull extends Document {
  username: string;
  password: string;
  sessions: Array<{
    sessionId: string;
    createdAt: Date;
    expiresAt: Date;
  }>;
}

export interface IUser {
  username: string;
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

const User = db.model<IUserFull>('User', UserSchema, 'users');

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

export async function addSessionToUser(username: string, password: string): Promise<string> {
  const user = await User.findOne({ username: username });

  if (!user) {
    throw new Error('User not found');
  }

  const match = bcrypt.compareSync(password, user.password)

  if (!match) {
    throw new Error('Invalid username or password');
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

export async function createUser(username: string, password: string): Promise<IUserFull | null> {
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

export async function getUserBySessionId(sessionId: string): Promise<IUser | null> {
  const user = await User.findOne({ 'sessions.sessionId': sessionId });

  if (!user) {
    return null;
  }

  const session = user.sessions
    .find((session) => session.sessionId === sessionId);

  if (!session || session.expiresAt < new Date()) {
    user.sessions = user.sessions.filter((session) => session.sessionId !== sessionId);
    await user.save();
    return null;
  }

  return {
    username: user.username,
  }
}

export async function deleteSession(sessionId: string): Promise<void> {
  await User.updateOne({ 'sessions.sessionId': sessionId }, {
    $pull: {
      sessions: { sessionId: sessionId }
    }
  });
}
