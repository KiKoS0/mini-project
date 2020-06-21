import { join } from 'path'

export function getEnvVar (key: string): string {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`)
  }
  return process.env[key] as string
}
export function getEnvVarOptional (key: string): string | undefined {
  return process.env[key]
}

export function getPath (path: string): string {
// Production tests don't work with jest because NODE_ENV=test
// Finding a solution will make the function more complicated
  return (process.env.NODE_ENV === 'production')
    ? join(process.cwd(), path.replace('src/', 'build/src/').slice(0, -3) + '.js')
    : join(process.cwd(), path)
}

export function getPaths (paths: string[]): string[] {
  return paths.map(p => getPath(p))
}

export function getOsPath (key: string): string {
  return getPath(getEnvVar(key))
}

export function getEnvVarArray (key: string, delimiter: string = ','): string[] {
  return (process.env[key] && process.env[key]?.split(delimiter)) || []
}

export function getOsPaths (key: string): string[] {
  return getPaths(getEnvVarArray(key))
}

export function toNumber (value: string): number {
  return parseInt(value, 10)
}

export function toBool (value: string): boolean {
  return value === 'true'
}
