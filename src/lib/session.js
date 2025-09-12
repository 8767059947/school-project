import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function getSession() {
  const token = cookies().get('session_token')?.value;
  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    return { email: payload.email }; // Return user data
  } catch (error) {
    return null; // Token is invalid or expired
  }
}