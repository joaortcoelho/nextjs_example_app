import { getCookie } from 'cookies-next';

export interface Profile {
  id: number | null;
  username: string | null;
  role: string | null;
}

export default async function profileHandler() {
  try {
    const token = getCookie('token') as string;
    const response = await fetch('http://localhost:8080/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.ok) return await response.json();
  } catch (error) {
    console.log(error);
  }
}
