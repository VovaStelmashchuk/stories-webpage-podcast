import { defineEventHandler, createError } from 'h3'
import { getObjectAsStream } from '../../minio/minioClient'

export default defineEventHandler(async (event) => {
  const params = event.context.params;

  if (!params) {
    throw createError({ statusCode: 400, message: 'Missing key' })
  }

  const key = params.key

  try {
    const stream = await getObjectAsStream(key)
    event.node.res.setHeader('Content-Type', stream.contentType)
    await sendStream(event, stream.stream)
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Failed to get image URL' })
  }
})
