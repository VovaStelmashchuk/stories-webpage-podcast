const config = useRuntimeConfig()

export function buildObjectURL(minioKey: string): string {
  return `${config.host}/files/${minioKey}`;
}
