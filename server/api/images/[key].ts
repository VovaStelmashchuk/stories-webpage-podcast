import { defineEventHandler, createError } from 'h3'
import { getObjectAsStream } from '../../minio/minioClient'

export default defineEventHandler(async (event) => {
  const param = event.context.params

  if (!param) {
    throw createError({ statusCode: 400, message: 'Missing key' })
  }

  const key = param.key

  try {
    const stream = await getObjectAsStream(key)
    event.node.res.setHeader('Content-Type', 'image/jpeg')
    await sendStream(event, stream)
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Failed to get image URL' })
  }
})
