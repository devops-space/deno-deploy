import { serve } from 'https://deno.land/std@0.120.0/http/server.ts'

interface Content {
  url: string
  method?: string
  redirect?: 'error' | 'follow' | 'manual'
  headers?: {
    [key: string]: string
  }
}

const CORS_HEADERS = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Credentials': 'false',
  'Access-Control-Expose-Headers': 'Content-Disposition',
  'Access-Control-Allow-Headers': 'Content-Type,X-CSRF-Token,Authorization,Token',
  'Access-Control-Max-Age': '60'
}

async function handler(req: Request) {
  let allowOrigin = '*'
  const origin = req.headers.get('origin') || req.headers.get('referer')
  if (origin) allowOrigin = new URL(origin).origin

  if (req.method == 'OPTIONS') {
    const headers = new Headers(CORS_HEADERS)
    headers.set('Access-Control-Allow-Origin', allowOrigin)
    return new Response(null, { status: 204, headers })
  }

  const content = (await req.json()) as Content
  return fetch(content.url, {
    method: content.method || 'GET',
    headers: content.headers || {},
    redirect: content.redirect || 'follow'
  }).then(resp => {
    const headers = new Headers(resp.headers)
    headers.set('Access-Control-Allow-Origin', allowOrigin)

    return new Response(resp.body, {
      status: resp.status,
      headers: headers
    })
  })
}

console.log('Listening on http://localhost:8000')
await serve(handler, { hostname: '0.0.0.0', port: 8000 })
