import { NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(request) {
  const token = request.cookies.get('session_token')?.value;
  const loginUrl = new URL('/login', request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jose.jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  // Ab yeh sirf 'add-school' ko protect karega
  matcher: ['/add-school/:path*'],
};