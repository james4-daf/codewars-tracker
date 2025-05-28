import { NextRequest, NextResponse } from 'next/server';

export const fetchCompletedChallenges = async (username: string) => {
  const res = await fetch(
    `https://www.codewars.com/api/v1/users/${username}/code-challenges/completed`,
  );
  if (!res.ok) throw new Error('Failed to fetch challenges');
  return res.json();
};

export const userInfo = async (username: string) => {
  const res = await fetch(`https://www.codewars.com/api/v1/users/${username}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};

export const headToHead = async (username1: string, username2: string) => {
  const [res1, res2] = await Promise.all([
    fetch(`https://www.codewars.com/api/v1/users/${username1}`),
    fetch(`https://www.codewars.com/api/v1/users/${username2}`),
  ]);

  if (!res1.ok || !res2.ok) {
    throw new Error('Failed to fetch one or both users');
  }

  const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
  return {
    users: [
      { username: data1.username, honor: data1.honor },
      { username: data2.username, honor: data2.honor },
    ],
  };
};

export const userInfoDaf = async () => {
  const res = await fetch(`https://www.codewars.com/api/v1/users/dafyddj98`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};
