import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    // 1. Check if a valid, non-expired OTP exists
    const results = await query({
      query: 'SELECT id FROM otps WHERE email = ? AND otp = ? AND expires_at > NOW()',
      values: [email, otp],
    });

    if (results.length === 0) {
      return NextResponse.json({ message: 'Invalid or expired OTP.' }, { status: 401 });
    }

    // 2. OTP is valid, so create a session token (JWT)
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // 3. Set the token in a secure, httpOnly cookie
    cookies().set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // 4. Clean up the used OTP from the database
    await query({
        query: 'DELETE FROM otps WHERE email = ?',
        values: [email],
    });

    return NextResponse.json({ message: 'Login successful.' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'An error occurred.' }, { status: 500 });
  }
}