'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type UserInfo = {
  username: string;
  honor: number;
};

export default function UserInfo() {
  const searchParams = useSearchParams();
  const user1 = searchParams.get('user1');
  const user2 = searchParams.get('user2');

  const [data, setData] = useState<UserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user1 || !user2) return;

    Promise.all([
      fetch(`/api/userInfo?username=${user1}`).then((res) => {
        if (!res.ok) throw new Error('User 1 fetch failed');
        return res.json();
      }),
      fetch(`/api/userInfo?username=${user2}`).then((res) => {
        if (!res.ok) throw new Error('User 2 fetch failed');
        return res.json();
      }),
    ])
      .then(([data1, data2]) => {
        setData([data1, data2]);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [user1, user2]);

  if (!user1 || !user2) return <p>Both user1 and user2 must be in URL</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {data.map((user) => (
        <div key={user.username}>
          <h2>{user.username}</h2>
          <p>Honor: {user.honor}</p>
        </div>
      ))}
    </div>
  );
}
