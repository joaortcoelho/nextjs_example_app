import { Divider, Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const Favoritos: React.FC = () => {
  return (
    <>
      <div className="Favoritos">
        <Title>Favoritos</Title>
      </div>
      <Divider />
    </>
  );
};

export default Favoritos;
