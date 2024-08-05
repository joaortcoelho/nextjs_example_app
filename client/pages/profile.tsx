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
          <Title level={3}>Perfil</Title>
          <Divider />
          <Title level={5}>Utilizador</Title> {getCookie('username')}
          <Title level={5}>Id</Title> {user.userId}
          <Title level={5}>Role</Title> {user.userRole}
        </>
      </div>
    </>
  );
};
export default Profile;
