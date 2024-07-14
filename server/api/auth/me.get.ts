export default defineEventHandler(async (event) => {
  const user = event.context.user

  return new Response(JSON.stringify({ username: user.username }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
})