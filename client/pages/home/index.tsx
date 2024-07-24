import { Divider, Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const Home: React.FC = () => {
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
