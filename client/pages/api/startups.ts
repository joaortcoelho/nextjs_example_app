// pages/api/startups.ts

import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function startupsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  try {
    const token = req.headers.authorization as string;
    //console.log(token);

    const response = await fetch('http://localhost:8080/startups', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(401).json({ error: 'Invalid token.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
}

export async function startupByIdHandler(id: number) {
  try {
    const token = getCookie('token') as string;
    //console.log(token);

    if (!token) throw new Error('Token not found!');

    const response = await fetch(`http://localhost:8080/startups/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    console.log(response.status);

    if (response.ok) {
      return await response.json();
    } else {
      Error('Invalid token.');
    }
  } catch (error) {
    Error('Internal server error.');
  }
}
