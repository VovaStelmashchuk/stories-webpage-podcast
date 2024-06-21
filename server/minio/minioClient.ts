import { Client } from 'minio'

const config = useRuntimeConfig()

const minioClient = new Client({
  endPoint: config.minio.endPoint,
  port: Number(config.minio.port),
  useSSL: false,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey,
})

const bucketName = 'story-podcast'

async function getObjectUrl(key: string) {
  return await minioClient.presignedGetObject(bucketName, key, 24 * 60 * 60)
}

async function getObjectAsString(key: string): Promise<import("stream").Readable> {
  const stream = await minioClient.getObject(bucketName, key)
  return stream
}

async function getFileSizeInByte(key: string): Promise<number> {
  const stat = await minioClient.statObject(bucketName, key)
  return stat.size
}

async function uploadFile(key: string, body: string) {
  await minioClient.putObject(bucketName, key, body)
}

export { getObjectUrl, getObjectAsString, getFileSizeInByte, uploadFile }


