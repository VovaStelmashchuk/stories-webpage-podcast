import {addSessionToUser} from "~/server/database/user";

export default defineEventHandler(async (event) => {
    const {username, password} = await readBody(event)

    if (!username || !password) {
        throw createError({statusCode: 400, message: 'Missing username or password'})
    }

    const sessionId = await addSessionToUser(username, password)
    setCookie(event, "Authentication", sessionId);

    return {
      username: username
    }
})
