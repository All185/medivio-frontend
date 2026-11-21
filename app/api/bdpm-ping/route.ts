import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Test 1 : le Route Handler est-il atteint ?
  const testUrl = 'https://medicaments-api.giygas.dev/v1/medicaments?search=paracetamol&pageSize=1'

  let upstream: { status: number; body: unknown } = { status: 0, body: null }
  let error: string | null = null

  try {
    const res = await fetch(testUrl, { headers: { Accept: 'application/json' } })
    upstream.status = res.status
    try { upstream.body = await res.json() } catch { upstream.body = await res.text() }
  } catch (e) {
    error = String(e)
  }

  return NextResponse.json({
    handlerReached: true,
    requestedUrl: request.nextUrl.href,
    constructedUpstreamUrl: testUrl,
    upstream,
    error,
  })
}
