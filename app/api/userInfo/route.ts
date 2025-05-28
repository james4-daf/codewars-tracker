import { NextResponse } from 'next/server';
import { userInfoDaf } from '../../../lib/codewars';

export async function GET() {
  try {
    const data = await userInfoDaf();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
