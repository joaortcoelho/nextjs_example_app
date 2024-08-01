import { Alert, Divider, List, Spin, Typography } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { startupByIdHandler } from './api/startups';

interface Favorito {
  id_utilizador: number;
  id_startup: number;
}

interface Startup extends Favorito {
  nome: string;
}

const { Title } = Typography;

const Favoritos: React.FC = () => {
  const [data, setData] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = getCookie('token') as string;

      try {
        const response = await fetch('/api/favoritos', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        const result = await response.json();
        console.log(result);

        // console.log(await startupByIdHandler(1)); //teste

        if (response.ok) {
          const startups = await Promise.all(
            result.map(async (item: { id_startup: any }) => {
              console.log(item.id_startup);
              const detailsResponse = await fetch(`/api/startups/${item.id_startup}`, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
                },
              });
              if (!detailsResponse.ok) {
                throw new Error('Failed to fetch startup details');
              }
              return await detailsResponse.json();
            }),
          );
          setData(startups);
        } else {
          setError(result.error || 'Failed to fetch data');
        }
      } catch (error) {
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
