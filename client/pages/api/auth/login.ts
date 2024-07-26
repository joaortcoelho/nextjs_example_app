import { NextApiRequest, NextApiResponse } from 'next';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const username = req.headers.username as string;
    const password = req.headers.password as string;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required.' });
      return;
    }

    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        username,
        password,
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      res.status(200).json({ success: true, token: data.token });
      if (typeof window !== 'undefined') {
        // store token in browser
        localStorage.setItem('token', JSON.stringify(data));
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}

