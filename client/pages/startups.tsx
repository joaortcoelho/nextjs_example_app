import { Alert, Button, Divider, List, message, Space, Spin, Typography } from 'antd';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import startupsHandler, { Startup } from './api/startups';
import { addFavoritoHandler } from './api/favoritos';
import { StarOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Startups: React.FC = () => {
  const [data, setData] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [messageApi, contextHolder] = message.useMessage();

  const addFavMsg = (startupName: string) => {
    messageApi.open({
      type: 'success',
      content: `${startupName} adicionada aos favoritos!`,
    });
  };

  const warnFavMsg = (startupName: string) => {
    messageApi.open({
      type: 'warning',
      content: `${startupName} já está nos favoritos!`,
    });
  };

  useEffect(() => {
    const token = getCookie('token') as string;

    const fetchData = async () => {
      try {
        const response = await startupsHandler(token);
        //console.log(response);

        if (Array.isArray(response)) {
          setData(response);
        } else {
          setError(response.error || 'Failed to fetch data');
        }
      } catch (error) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateHandler = async (startupName: string, startupId: number) => {
    try {
      let response = await addFavoritoHandler(Number(getCookie('userId')), startupId);
      if (response.success) {
        addFavMsg(startupName);
      } else {
        warnFavMsg(startupName);
      }
    } catch (error) {
      console.error('Error adding favorite:', error); // Debugging statement
    }
  };

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description="Failed to load data." type="error" showIcon />;

  return (
    <>
      {contextHolder}
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
            <Typography.Text>{item.id}</Typography.Text>
            <Typography.Title level={5}>{item.nome}</Typography.Title>
            <Button
              icon={<StarOutlined />}
              onClick={async () => {
                updateHandler(item.nome, item.id);
              }}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Startups;
