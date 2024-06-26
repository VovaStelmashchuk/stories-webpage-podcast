import { getObjectAsStream } from "~/server/minio/minioClient";

export default defineEventHandler(async (event) => {
  if (event.method !== 'GET') {
    return sendError(event, new Error('Method not allowed'));
  }
  try {
    const fileStream = await getObjectAsStream('rss.xml')
    event.node.res.setHeader('Content-Type', fileStream.contentType)
    return sendStream(event, fileStream.stream);
  } catch (error) {
    console.error('Error fetching the file from Minio:', error);
    return sendError(event, new Error('Rss not found'));
  }
});
