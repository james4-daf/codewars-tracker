import { NextRequest, NextResponse } from 'next/server';
import { headToHead, userInfo } from '../../../lib/codewars';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user1 = searchParams.get('user1');
  const user2 = searchParams.get('user2');

  if (!user1 || !user2) {
    return NextResponse.json(
      { error: 'Both usernames are required' },
      { status: 400 },
    );
  }

  const [res1, res2] = await Promise.all([
    fetch(`https://www.codewars.com/api/v1/users/${user1}`),
    fetch(`https://www.codewars.com/api/v1/users/${user2}`),
  ]);

  if (!res1.ok || !res2.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch one or both users' },
      { status: 500 },
    );
  }

  const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

  return NextResponse.json({
    users: [
      { username: data1.username, honor: data1.honor },
      { username: data2.username, honor: data2.honor },
    ],
    // Optionally, add a comparison result here
  });
}
