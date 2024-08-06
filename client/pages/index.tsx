import { useSession } from '@/context/sessionContext';
import { Divider, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const Home: React.FC = () => {
  const { username } = useSession();
  return (
    <>
      <div className="Home">
        {useSession().isLoggedIn ? (
          <>
            <Title level={3}>Bem-vindo, {username}.</Title>
            <Divider />
          </>
        ) : (
          <>
            <Title level={3}>Bem-vindo!</Title>
            <Divider />
          </>
        )}
      </div>
    </>
  );
};
export default Home;
