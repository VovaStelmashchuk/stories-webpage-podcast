const config = useRuntimeConfig()

export function buildObjectURL(minioKey: string): string {
  return `https://androidstory.dev/files/${ minioKey }`;
}
