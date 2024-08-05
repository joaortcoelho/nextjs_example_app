import { useSession } from '@/context/session';
import { Divider, Typography } from 'antd';

import React from 'react';
import { getCookie } from 'cookies-next';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <>
      <div className="Home">
        {useSession().isLoggedIn ? (
          <>
            <Title level={2}>Bem-vindo, {getCookie('username')}.</Title>
            <Divider />
          </>
        ) : (
          <>
            <Title>Bem-vindo!</Title>
            <Divider />
          </>
        )}
      </div>
    </>
  );
};
export default Home;
