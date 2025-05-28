'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type UserInfo = {
  username: string;
  honor: number;
};

export default function UserInfo() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const [data, setData] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    fetch(`/api/userInfo?username=${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [username]);

  if (!username) return <p>No username provided in URL</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{data?.username}</h1>
      <p>{data?.honor}</p>
    </div>
  );
}
