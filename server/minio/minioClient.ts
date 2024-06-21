import {Client} from 'minio'

const config = useRuntimeConfig()

const minioClient = new Client({
    endPoint: config.minio.endPoint,
    port: Number(config.minio.port),
    useSSL: false,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey,
})

async function getObjectUrl(key: string) {
    return await minioClient.presignedGetObject('story-podcast', key, 24 * 60 * 60) // 1-day expiry
}

export {getObjectUrl}

