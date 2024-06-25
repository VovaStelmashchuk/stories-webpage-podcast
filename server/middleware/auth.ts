import { getUserBySessionId } from "~/server/database/user";

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api/auth/')) {
    const authHeader = event.headers.get('Authorization')

    if (!authHeader) {
      return new Response('Unauthorized', { status: 401 })
    }

    const sessionId = authHeader?.split(' ')[1]

    if (!sessionId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const user = await getUserBySessionId(sessionId)

    if (!user) {
      return new Response('Unauthorized', { status: 401 })
    }

    event.context.user = user
  }
})
