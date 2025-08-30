import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Using the helper we just created

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, address, city, state, contact, image, email_id } = data;

    // Basic validation
    if (!name || !email_id) {
      return NextResponse.json({ message: 'Name and Email are required.' }, { status: 400 });
    }

    const insertQuery = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query({
      query: insertQuery,
      values: [name, address, city, state, contact, image, email_id],
    });

    return NextResponse.json({ message: 'School added successfully!', result }, { status: 201 });

  } catch (error) {
     if (error.message.includes('Duplicate entry')) {
      return NextResponse.json(
        { message: 'This email address is already registered. Please use a different one.' },
        { status: 409 } // 409 Conflict ek standard HTTP status hai is case ke liye
      );
    }
    return NextResponse.json({ message: 'An error occurred.', error: error.message }, { status: 500 });
  }
}
