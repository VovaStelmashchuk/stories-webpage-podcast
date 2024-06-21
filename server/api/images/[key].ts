import { defineEventHandler, createError } from 'h3'
import { getObjectAsString } from '~/server/minio/minioClient'

export default defineEventHandler(async (event) => {
  const param = event.context.params

  if (!param) {
    throw createError({ statusCode: 400, message: 'Missing key' })
  }

  const key = param.key

  try {
    const stream = await getObjectAsString(key)
    event.node.res.setHeader('Content-Type', 'application/octet-stream')
    await sendStream(event, stream)
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Failed to get image URL' })
  }
})
