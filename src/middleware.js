import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  const token = request.cookies.get('accessToken')

  const publicPaths = ['/login', '/forgot-password', '/reset-password']
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path))

  if (pathname === '/') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/login',
    '/forgot-password',
    '/reset-password',
  ],
}
