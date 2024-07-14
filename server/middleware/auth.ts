import {getUserBySessionId} from "~/server/database/user";

export default defineEventHandler(async (event) => {
    if (event.path.startsWith('/api/auth/')) {
        console.log("Auth middleware")
        const authCookie = event.headers.get('Cookie')?.split(';').find((c) => c.trim().startsWith('Authentication'))

        if (!authCookie) {
            return new Response('Unauthorized', {status: 401})
        }

        const sessionId = authCookie.split('=')[1]

        if (!sessionId) {
            return new Response('Unauthorized', {status: 401})
        }

        const user = await getUserBySessionId(sessionId)

        if (!user) {
            return new Response('Unauthorized', {status: 401})
        }

        event.context.user = user
        event.context.sessionId = sessionId
    }
})
