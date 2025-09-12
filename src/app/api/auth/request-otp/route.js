import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    // 1. Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. Set expiry time to 10 minutes from now
    const expires_at = new Date(Date.now() + 10 * 60 * 1000);

    // 3. Store OTP in the database
    await query({
      query: 'INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)',
      values: [email, otp, expires_at],
    });

    // 4. Send OTP email via Resend
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email, // IMPORTANT: On Resend's free plan, this MUST be the email you signed up with
      subject: 'Your OTP Code for School Directory',
      html: `<p>Your one-time password is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
    });

    return NextResponse.json({ message: 'OTP sent successfully.' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to send OTP.' }, { status: 500 });
  }
}