import { useSession } from '@/context/session';
import { Divider, Typography } from 'antd';

import React from 'react';
import { getCookie } from 'cookies-next';

const { Title } = Typography;

const Profile: React.FC = () => {
  const user = useSession();

  return (
    <>
      <div className="Home">
        <>
          <Title level={2}>Perfil</Title>
          <Divider />
          <Title level={5}>Utilizador: {getCookie('username')}</Title>
          <Title level={5}>Id: {user.userId}</Title>
          <Title level={5}>Role: {user.userRole}</Title>
        </>
      </div>
    </>
  );
};
export default Profile;
