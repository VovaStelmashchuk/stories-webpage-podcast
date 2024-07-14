import { deleteSession } from "~/server/database/user";

export default defineEventHandler(async (event) => {
  const currentSessionId = event.context.sessionId
  await deleteSession(currentSessionId)
})