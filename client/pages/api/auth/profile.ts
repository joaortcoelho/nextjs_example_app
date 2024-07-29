import { NextApiRequest, NextApiResponse } from 'next';

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const token = req.headers.authorization as string;

    if (!token) {
      res.status(400).json({ error: 'Authentication required.' });
      return;
    }

    const response = await fetch('http://localhost:8080/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const data = await response.json();

    if (response.ok && data.token) {
      res.status(200).json({ success: true, token: data.token });
    } else {
      res.status(401).json({ error: 'Invalid token.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
