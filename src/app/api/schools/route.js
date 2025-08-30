import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // FIX: Added 'id' to the SELECT statement
    const getSchoolsQuery = 'SELECT id, name, address, city, image FROM schools ORDER BY id DESC';
    
    const schools = await query({
      query: getSchoolsQuery,
      values: [],
    });

    return NextResponse.json({ schools: schools });

  } catch (error) {
    return NextResponse.json({ message: 'An error occurred.', error: error.message }, { status: 500 });
  }
}