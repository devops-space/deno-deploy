import { serve } from 'https://deno.land/std@0.120.0/http/server.ts'


async function handler(req: Request) {
  const resp = await fetch('https://www.searchpeoplefree.com/phone-lookup/706-990-8659', {
    headers: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      referer: 'https://www.searchpeoplefree.com/phone-lookup',
    }
  })
  const headers = new Headers(resp.headers)
  return new Response(resp.body, {
    status: resp.status,
    headers: headers
  })
}

console.log('Listening on http://localhost:8000')
await serve(handler, { hostname: '0.0.0.0', port: 8000 })
