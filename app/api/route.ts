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

export const userInfoDaf = async () => {
  const res = await fetch(`https://www.codewars.com/api/v1/users/dafyddj98`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};
