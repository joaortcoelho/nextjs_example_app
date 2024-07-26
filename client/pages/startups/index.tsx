import { Divider, Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const Startups: React.FC = () => {
  return (
    <>
      <div className="Home">
        <Title>Startups</Title>
      </div>
      <Divider />
    </>
  );
};

export default Startups;
