import { useSession } from '@/context/session';
import { Divider, Typography } from 'antd';
import { getCookie } from 'cookies-next';
import React from 'react';

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <>
      <div className="Home">
        {useSession().isLoggedIn ? <Title>Bem-vindo, {getCookie('username')}! </Title> : <Title>Bem-vindo!</Title>}
      </div>
      <Divider />
    </>
  );
};
export default Home;
