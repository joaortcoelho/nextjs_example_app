import { NextApiRequest, NextApiResponse } from 'next';

export default async function loginHandler(req: any, res: NextApiResponse) {
  try {
    const username = req.username;
    const password = req.password;

    const reply = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        username: username,
        password: password,
      },
      body: JSON.stringify({}),
    });

    const data = await reply.json();
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
      res.status(200).json({ success: true });
      return null;
    }
  } catch (error) {
    if (error === 'CredentialsSignin') {
      res.status(401).json({ error: 'Invalid credentials.' });
    } else {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}

export const logoutHandler = () => {
  localStorage.clear;
  return 200;
};
