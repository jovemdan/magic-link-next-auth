import { NextRequest, NextResponse } from 'next/server'
import { getURL } from './lib/get-url'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token')
  const pathname = request.nextUrl.pathname

  if (pathname === '/auth' && token) {
    return NextResponse.redirect(new URL(getURL('/app')))
  }

  if (pathname.includes('/app') && !token) {
    return NextResponse.redirect(new URL(getURL('/auth')))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
