import { NextRequest, NextResponse } from 'next/server'

const BDPM_BASE = 'https://medicaments-api.giygas.dev'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const pathname = path.join('/')
  const search = request.nextUrl.search

  const url = `${BDPM_BASE}/${pathname}${search}`

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 }, // cache 5 min côté serveur
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `BDPM upstream error ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' },
    })
  } catch {
    return NextResponse.json({ error: 'BDPM unreachable' }, { status: 502 })
  }
}
