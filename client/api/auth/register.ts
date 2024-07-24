import { NextApiRequest, NextApiResponse } from 'next';

export default async function registerHandler(req: any, res: NextApiResponse) {
  try {
    const username = req.username;
    const password = req.password;
    const confPass = req.confPass;

    const listen = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        username: username,
        password: password,
      },
      body: JSON.stringify({}),
    });

    const response = await listen.json();
    if (response.token) {
      localStorage.setItem('user', JSON.stringify(response));
      res.status(200).json({ success: true });
      return;
    }
  } catch (error) {
    if (error === 'CredentialsRegister') {
      res.status(401).json({ error: 'Invalid inputs.' });
    } else {
      res.status(500).json({ error: 'Something went wrong.' });
    }
  }
}
