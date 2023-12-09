import { serve } from 'https://deno.land/std@0.120.0/http/server.ts'


async function handler(req: Request) {
  const resp = await fetch('https://www.searchpeoplefree.com/phone-lookup/706-990-8659')
  const headers = new Headers(resp.headers)
  return new Response(resp.body, {
    status: resp.status,
    headers: headers
  })
}

console.log('Listening on http://localhost:8000')
await serve(handler, { hostname: '0.0.0.0', port: 8000 })
