export function buildImageURL(minioKey: string): string {
  return `/api/files/${ minioKey }`;
}

