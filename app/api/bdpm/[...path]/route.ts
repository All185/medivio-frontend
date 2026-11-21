import { NextRequest, NextResponse } from 'next/server'

const BDPM_BASE = 'https://medicaments-api.giygas.dev'

export async function GET(request: NextRequest) {
  // Extrait le chemin après /api/bdpm/ sans dépendre de params
  const pathname = request.nextUrl.pathname.replace(/^\/api\/bdpm\/?/, '')
  const search = request.nextUrl.search

  const url = `${BDPM_BASE}/${pathname}${search}`

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `BDPM upstream error ${res.status}` },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
      },
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'BDPM unreachable', detail: String(err) },
      { status: 502 }
    )
  }
}
