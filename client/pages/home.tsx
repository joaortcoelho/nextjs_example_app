import { Divider, Typography } from 'antd';
import { getCookie } from 'cookies-next';
import React from 'react';

const { Title } = Typography;

const Home: React.FC = () => {
  if (getCookie('token')) {
    return (
      <>
        <div className="Home">
          <Title>Bem-vindo, {getCookie('username')}!</Title>
        </div>
        <Divider />
      </>
    );
  }
  return (
    <>
      <div className="Home">
        <Title>Bem-vindo!</Title>
      </div>
      <Divider />
    </>
  );
};

export default Home;
