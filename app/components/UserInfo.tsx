import { userInfoDaf } from '../api/route';

export default async function UserInfo() {
  const data = await userInfoDaf();

  console.log(data.username);

  return (
    <div>
      <h1>{data.username}</h1>
      <p>{data.honor}</p>
    </div>
  );
}
