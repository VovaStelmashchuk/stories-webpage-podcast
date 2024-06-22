import { createError, defineEventHandler } from 'h3'
import { getObjectAsStream } from '../../minio/minioClient'

export default defineEventHandler(async (event) => {
  const params = event.context.params;

  if (!params) {
    throw createError({ statusCode: 400, message: 'Missing key' })
  }

  const key = params.key

  try {
    const object = await getObjectAsStream(key)
    event.node.res.setHeader('Content-Type', object.contentType)
    await sendStream(event, object.stream)
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Failed to get image URL' })
  }
})
