import {Client} from 'minio'

const config = useRuntimeConfig()

const minioClient = new Client({
  endPoint: config.minio.endPoint,
  port: Number(config.minio.port),
  useSSL: false,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey,
})

const bucketName = 'story-podcast'

export async function getObjectUrl(key: string) {
  return await minioClient.presignedGetObject(bucketName, key)
}

export async function getFileSizeInByte(key: string): Promise<number> {
  const stat = await minioClient.statObject(bucketName, key)
  return stat.size
}

export async function uploadFile(key: string, body: string) {
  await minioClient.putObject(bucketName, key, body, undefined, {
    'Content-Type': 'text/xml',
  })
}
