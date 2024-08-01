import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function profileHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(400).json({ error: 'Authentication required.' });
      return;
    }

    const response = await fetch('http://localhost:8080/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    });

    const data = await response.json();

    if (response.ok && data) {
      res.status(200).json({ success: true, data: data });
    } else {
      res.status(401).json({ error: 'Invalid token.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
