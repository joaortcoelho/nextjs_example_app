import { NextApiRequest, NextApiResponse } from 'next';

export default async function registerHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const username = req.headers.username as string;
    const password = req.headers.password as string;
    const confPass = req.headers.confpass as string;

    console.log('Request received:', { method: req.method, headers: req.headers });

    if (!username || !password || !confPass) {
      res.status(400).json({ error: 'Username and password are required.' });
      return;
    }

    if (password !== confPass) {
      res.status(400).json({ error: 'Passwords do not match.' });
      return;
    }

    const response = await fetch('http://localhost:8080/register', {
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
    } else {
      res.status(400).json({ error: data.message || 'Registration failed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
