import { addSessionToUser, getUserByUserName } from "~/server/database/user";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (!username || !password) {
    throw createError({ statusCode: 400, message: 'Missing username or password' })
  }

  const user = await getUserByUserName(username)

  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid username or password' })
  }

  const match = bcrypt.compareSync(password, user.password)

  if (!match) {
    throw createError({ statusCode: 401, message: 'Invalid username or password' })
  }

  const sessionId = await addSessionToUser(username)

  return {
    sessionId: sessionId
  }
})
