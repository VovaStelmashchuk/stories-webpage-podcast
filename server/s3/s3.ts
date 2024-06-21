//import {HeadObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";

const config = useRuntimeConfig()

const bucket = config.s3.bucket;

/*
const client = new S3Client({
    region: "ams3",
    credentials: {
        accessKeyId: config.s3.accessKeyId,
        secretAccessKey: config.s3.secretAccessKey,
    },
    endpoint: 'https://ams3.digitaloceanspaces.com',
});
*/


function uploadFile(key: string, body: string) {
    /*return client.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: 'text/xml',
        ACL: 'public-read',
    }));*/
}

async function getFileSizeInByte(key: string): Promise<number> {
    /*const response = await client.send(new HeadObjectCommand({
        Bucket: bucket,
        Key: key,
    }));

    return response.ContentLength || 0;*/

    return 0;
}

export default {
    uploadFile,
    getFileSizeInByte,
};