// pages/api/startups.ts

import { getCookie } from 'cookies-next';

export interface Startup {
  id: number;
  nome: string;
}

export default async function startupsHandler(token: string) {
  try {
    const response = await fetch('http://localhost:8080/startups', {
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

export async function startupByIdHandler(token: string, startupId: number) {
  try {
    const response = await fetch(`http://localhost:8080/startups/${startupId}`, {
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
