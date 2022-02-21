import { serve } from 'https://deno.land/std@0.120.0/http/server.ts'
import { readText } from './util.ts'

async function handler(req: Request) {
  console.log(req.url)
  const text = await readText('./README.md')
  return new Response(text)
}

console.log('Listening on http://localhost:8000')
await serve(handler, { hostname: '0.0.0.0', port: 8000 })
