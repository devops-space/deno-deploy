import { serve } from 'https://deno.land/std@0.120.0/http/server.ts'

interface Content {
  url: string
  method: string
  headers: {
    [key: string]: string
  }
}

async function handler(req: Request) {
  const content = (await req.json()) as Content
  return fetch(content.url, {
    method: content.method || 'GET',
    headers: content.headers || {}
  }).then(resp => {
    const headers = new Headers(resp.headers)
    headers.set('Access-Control-Allow-Origin', '*')
    headers.set('Access-Control-Allow-Methods', '*')
    headers.set('Access-Control-Allow-Credentials', 'true')
    headers.set('Access-Control-Expose-Headers', 'Content-Disposition')
    headers.set('Access-Control-Allow-Headers', 'Content-Type,X-CSRF-Token,Authorization,Token')
    headers.set('Access-Control-Max-Age', '60')

    return new Response(resp.body, {
      status: resp.status,
      headers: headers
    })
  })
}

console.log('Listening on http://localhost:8000')
await serve(handler, { hostname: '0.0.0.0', port: 8000 })
