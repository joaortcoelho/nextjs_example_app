import { Alert, Divider, List, Spin, Typography } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';

const { Title } = Typography;

interface Startup {
  id: number;
  nome: string;
}

const Startups: React.FC = () => {
  const [data, setData] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const token = getCookie('token') as string;
    const fetchData = async () => {
      try {
        const response = await fetch('/api/startups', {
          headers: {
            Authorization: token,
            'Cache-Control': 'no-cache',
          },
        });
        const result = await response.json();

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

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description="Failed to load data." type="error" showIcon />;

  return (
    <>
      <div className="Startups">
        <Title>Startups</Title>
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

export default Startups;
