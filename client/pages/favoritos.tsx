import { Alert, Divider, List, Spin, Typography } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { startupByIdHandler } from './api/startups';
import favoritosHandler from './api/favoritos';

interface Startup {
  id: number;
  nome: string;
}

interface Favorite {
  id_utilizador: number;
  id_startup: number;
}

const { Title } = Typography;

const Favoritos: React.FC = () => {
  const [data, setData] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getCookie('token') as string;
    const userId = getCookie('userId');

    const fetchData = async () => {
      try {
        const response = await favoritosHandler(token, Number(userId));
        console.log('Result:', response); // Debugging statement

        if (Array.isArray(response)) {
          const favorites = await Promise.all(
            response.map(async (favorite: Favorite) => {
              const startup = await startupByIdHandler(token, favorite.id_startup);
              return { ...startup, id_startup: favorite.id_startup };
            }),
          );
          setData(favorites);
        } else {
          setError(response.error || 'Failed to fetch data');
        }
      } catch (error) {
        console.error('Error during fetch:', error); // Debugging statement
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description="Failed to load data." type="error" showIcon />;

  return (
    <>
      <div className="Favoritos">
        <Title>Favoritos</Title>
      </div>
      <Divider />
      <List
        header={<div>Lista</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Title level={5}>{item.nome}</Typography.Title>
          </List.Item>
        )}
      />
    </>
  );
};

export default Favoritos;
