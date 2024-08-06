import {
  Alert,
  Button,
  Card,
  Divider,
  Flex,
  Input,
  List,
  message,
  Modal,
  Spin,
  Typography,
  Popconfirm,
  PopconfirmProps,
} from 'antd';
import React, { useEffect, useState } from 'react';
import startupsHandler, {
  addStartupHandler,
  deleteStartupHandler,
  Startup,
  updateStartupHandler,
} from './api/startups';
import { addFavoritoHandler } from './api/favorites';
import { DeleteOutlined, EditOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { useSession } from '@/context/sessionContext';

const { Title } = Typography;

const Startups: React.FC = () => {
  const { userId, userRole } = useSession();

  const [data, setData] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [startupName, setStartupName] = useState('');

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await startupsHandler();
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

  const favoriteHandler = async (startupName: string, startupId: number) => {
    try {
      const response = await addFavoritoHandler(Number(userId), startupId);
      if (response === 200) {
        messageApi.success(`${startupName} adicionada aos favoritos!`);
      } else {
        messageApi.warning(`${startupName} já está nos favoritos!`);
      }
    } catch (error) {
      console.error('Error adding favorite:', error); // Debugging statement
    }
  };

  const addHandler = async (newStartupName: string) => {
    try {
      const response = await addStartupHandler(newStartupName);
      if (response === 200) {
        messageApi.success(`${newStartupName} adicionada à lista!`);
        setData(await startupsHandler());
      } else {
        messageApi.error(`Erro ao adicionar startup!`);
      }
    } catch (error) {
      console.error('Failed to add startup.', error);
    }
  };

  const updateHandler = async (startupId: number, newStartupName: string) => {
    try {
      const response = await updateStartupHandler(startupId, newStartupName);
      if (response === 200) {
        messageApi.success(`Startup atualizada com sucesso!`);
        setStartupName('');
        setData(await startupsHandler());
      } else {
        messageApi.error(`Não foi possível atualizar a startup!`);
      }
    } catch (error) {
      console.error('Failed to update startup.', error);
    }
  };

  const deleteHandler = async (startupId: number) => {
    try {
      const response = await deleteStartupHandler(startupId);
      if (response === 200) {
        setData(await startupsHandler());
        messageApi.success(`Startup eliminada com sucesso!`);
      } else {
        messageApi.error(`Não foi possível eliminar a startup!`);
      }
    } catch (error) {
      console.error('Failed to delete startup.', error);
    }
  };

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description="Failed to load data." type="error" showIcon />;

  return (
    <>
      {contextHolder}
      <Flex className="Startups" gap="middle">
        <Title level={3}>Startups</Title>
        {userRole === 'admin' ? (
          <Button onClick={() => setIsAddModalOpen(true)}>
            <PlusOutlined /> Adicionar
          </Button>
        ) : null}
      </Flex>
      <Divider />

      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={data}
        locale={{ emptyText: 'Não existem startups.' }}
        renderItem={(item) => (
          <>
            <List.Item>
              <Card
                title={item.nome}
                actions={[
                  <StarOutlined key={'favorite'} onClick={() => favoriteHandler(item.nome, item.id)} />,
                  userRole === 'admin' && <EditOutlined key={'edit'} onClick={() => setIsUpdateModalOpen(true)} />,
                  userRole === 'admin' && (
                    <Popconfirm
                      title="Eliminar startup"
                      description={`Tem a certeza que deseja eliminar ${item.nome}?`}
                      onConfirm={() => deleteHandler(item.id)}
                      okText="Sim"
                      cancelText="Não"
                    >
                      <DeleteOutlined key={'delete'} />
                    </Popconfirm>
                  ),
                ]}
              >
                <p>ID: {item.id}</p>
              </Card>
            </List.Item>
            <Modal
              title="Editar startup"
              open={isUpdateModalOpen}
              onOk={() => {
                updateHandler(item.id, startupName);
                setIsUpdateModalOpen(false);
              }}
              okText="Atualizar"
              onCancel={() => setIsUpdateModalOpen(false)}
              cancelText="Cancelar"
            >
              <Input
                type="text"
                value={startupName}
                onChange={(i) => setStartupName(i.target.value)}
                placeholder={item.nome}
              />
            </Modal>
          </>
        )}
      />
      <Modal
        title="Adicionar startup"
        open={isAddModalOpen}
        onOk={() => {
          addHandler(startupName);
          setIsAddModalOpen(false);
        }}
        okText="Adicionar"
        onCancel={() => setIsAddModalOpen(false)}
        cancelText="Cancelar"
      >
        <Input
          type="text"
          value={startupName}
          onChange={(i) => setStartupName(i.target.value)}
          placeholder="Introduza o nome da nova startup"
        />
      </Modal>
    </>
  );
};

export default Startups;
