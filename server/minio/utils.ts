export function buildObjectURL(minioKey: string): string {
  return `/api/files/${ minioKey }`;
}

const config = useRuntimeConfig()


export function buildObjectURLWithHost(minioKey: string): string {
  return `${config.host}/api/files/${ minioKey }`;
}

