// pages/api/startups.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getCookie } from 'cookies-next';

export default async function favoritosHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const token = req.headers.authorization as string;
    const userId = getCookie('userId', { req, res }) as string;

    const data = await fetch(`http://localhost:8080/utilizadores/${userId}/favoritos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const favorites = await data.json();

    if (data.ok) {
      res.status(200).json(favorites);
    } else {
      res.status(401).json({ error: 'Invalid token.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
}
