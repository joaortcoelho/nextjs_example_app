// pages/api/startups.ts

import { getCookie } from 'cookies-next';

export interface Startup {
  id: number;
  nome: string;
}

export default async function startupsHandler() {
  try {
    const token = getCookie('token');
    if (!token) throw new Error('Token not found!');
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

export async function startupByIdHandler(startupId: number) {
  try {
    const token = getCookie('token');
    if (!token) throw new Error('Token not found!');
    const response = await fetch(`http://localhost:8080/startups/${startupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (response.ok) {
      return await response.json();
    } else {
      Error('Invalid token.');
    }
  } catch (error) {
    Error('Internal server error.');
  }
}

export async function addStartupHandler(startupName: string) {
  try {
    const token = getCookie('token');
    if (!token) throw new Error('Token not found!');

    const response = await fetch(`http://localhost:8080/startups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ nome: startupName }),
    });

    if (response.ok) {
      return response.status;
    } else {
      Error('Invalid token.');
    }
  } catch (error) {
    Error('Internal server error.');
  }
}

export async function updateStartupHandler(startupId: number, newName: string) {
  try {
    const token = getCookie('token');
    if (!token) throw new Error('Token not found!');

    const response = await fetch(`http://localhost:8080/startups/${startupId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        nome: newName,
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      return response.status;
    } else {
      Error('Invalid token.');
    }
  } catch (error) {
    Error('Internal server error.');
  }
}

export async function deleteStartupHandler(startupId: number) {
  try {
    const token = getCookie('token');
    if (!token) throw new Error('Token not found!');

    const response = await fetch(`http://localhost:8080/startups/${startupId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({}),
    });

    if (response.ok) {
      return response.status;
    } else {
      Error('Invalid token.');
    }
  } catch (error) {
    Error('Internal server error.');
  }
}
