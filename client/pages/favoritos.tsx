import { Alert, Divider, List, Spin, Typography } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';

const { Title } = Typography;

interface Favorito {
  id: number;
  nome: string;
}

const Favoritos: React.FC = () => {
  const [data, setData] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const token = getCookie('token') as string;
    const fetchData = async () => {
      try {
        const response = await fetch('/api/favoritos', {
          headers: {
            Authorization: token,
            'Cache-Control': 'no-cache',
          },
        });
        const result = await response.json();
        console.log(result);

        if (response.ok) {
          setData(result);
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

  if (loading) return <Spin tip="A carregar..." />;
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
            <Typography.Text mark>{item.nome}</Typography.Text>
          </List.Item>
        )}
      />
    </>
  );
};

export default Favoritos;
