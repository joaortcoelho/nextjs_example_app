import { Alert, Button, Divider, List, message, Spin, Typography } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { startupByIdHandler } from './api/startups';
import favoritosHandler, { rmFavoritoHandler } from './api/favoritos';
import { DeleteOutlined } from '@ant-design/icons';

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

  const [messageApi, contextHolder] = message.useMessage();

  const rmFavMsg = (startupName: string) => {
    messageApi.open({
      type: 'success',
      content: `${startupName} removido dos favoritos!`,
    });
  };

  const rmErrorMsg = (startupName: string) => {
    messageApi.open({
      type: 'success',
      content: `Erro ao remover ${startupName} dos favoritos!`,
    });
  };

  useEffect(() => {
    const token = getCookie('token') as string;
    const userId = getCookie('userId');

    const fetchData = async () => {
      try {
        const response = await favoritosHandler(token, Number(userId));
        //console.log('Result:', response); // Debugging statement

        if (Array.isArray(response)) {
          if (response.length === 0) {
            setData([]);
          }
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

  const updateHandler = async (startupName: string, startupId: number) => {
    try {
      await rmFavoritoHandler(Number(getCookie('userId')), startupId);
      rmFavMsg(startupName);
      // Remove the favorite from the data list
      setData((prevData) => prevData.filter((item) => item.id !== startupId));
    } catch (error) {
      console.error('Error removing favorite:', error); // Debugging statement
      rmErrorMsg(startupName);
    }
  };

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description="Failed to load data." type="error" showIcon />;

  return (
    <>
      {contextHolder}
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
            <Typography.Text>{item.id}</Typography.Text>
            <Typography.Title level={5}>{item.nome}</Typography.Title>
            <Button icon={<DeleteOutlined />} onClick={() => updateHandler(item.nome, item.id)} />
          </List.Item>
        )}
      />
    </>
  );
};

export default Favoritos;
