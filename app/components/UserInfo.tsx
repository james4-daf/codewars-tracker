'use client';

import { useEffect, useState } from 'react';

type UserInfo = {
  username: string;
  honor: number;
};

export default function UserInfo() {
  const [data, setData] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/userInfo')
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
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <h1>{data?.username}</h1>
      <p>{data?.honor}</p>
    </div>
  );
}
