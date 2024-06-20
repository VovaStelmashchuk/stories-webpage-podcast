import {Client} from 'minio'

const config = useRuntimeConfig()

const minioClient = new Client({
    endPoint: config.minio.endPoint,
    port: Number(config.minio.port),
    useSSL: false,
    accessKey: config.minio.accessKey,
    secretKey: config.minio.secretKey,
})

export default minioClient

