import { createUser } from "~/server/database/user";

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const { adminToken, username, password } = await readBody(event);

  if (!adminToken || !username || !password) {
    throw createError({ statusCode: 400, message: 'Missing admin token, username or password' });
  }

  if (adminToken !== config.adminToken) {
    throw new Error('Invalid admin token');
  }

  await createUser(username, password)

  return {
    "message": "User created successfully",
    "username": username
  };
});