// pages/api/startups.ts
import { getCookie } from 'cookies-next';

export interface Favorite {
  id_utilizador: number;
  id_startup: number;
}

export default async function favoritosHandler(userId: number) {
  try {
    const token = getCookie('token');
    if (!token) throw new Error('Token not found!');

    const response = await fetch(`http://localhost:8080/utilizadores/${userId}/favoritos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });

    if (!response.ok) return [];

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function addFavoritoHandler(userId: number, startupId: number) {
  try {
    const token = getCookie('token');
    if (!token) throw new Error('Token not found!');

    const response = await fetch(`http://localhost:8080/utilizadores/${userId}/favoritos/${startupId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({}),
    });

    if (response.status) return response.status;
  } catch (error) {
    console.log(error);
  }
}

export async function rmFavoritoHandler(userId: number, startupId: number) {
  try {
    const token = getCookie('token');
    if (!token) throw new Error('Token not found!');

    const response = await fetch(`http://localhost:8080/utilizadores/${userId}/favoritos/${startupId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({}),
    });

    if (response) return response.status;
  } catch (error) {
    console.log(error);
  }
}
