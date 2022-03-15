import { resolve } from 'https://deno.land/std@0.129.0/path/mod.ts'

const __filename = getCurrentFile()

// https://github.com/denoland/deno/issues/2125
// https://deno.land/x/dirname/mod.ts
function getCurrentFile(): string {
  const u: URL = new URL(import.meta.url)
  const f: string = u.protocol === 'file:' ? u.pathname : import.meta.url
  if (f.match(/^\/[a-zA-Z]+:/)) {
    return f.substring(1)
  }
  return f
}

export async function readText(path: string): Promise<string> {
  const data = await Deno.readFile(resolve(__filename, '..', path))
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(data)
}
