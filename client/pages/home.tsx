import { useSession } from '@/context/session';
import { Divider, Typography } from 'antd';

import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import React, { useEffect } from 'react';

const { Title } = Typography;

const Home: React.FC = () => {
  useEffect(() => {
    const token = getCookie('token') as string;
    const fetchData = async () => {
      try {
        const response = await fetch('/api/auth/profile', {
          headers: {
            authorization: token,
          },
        });
        const result = await response.json();

        if (response.ok && result.data) {
          setCookie('userId', result.data.id);
          setCookie('username', result.data.username);
          setCookie('userRole', result.data.role);
        } else {
          deleteCookie('userId');
          deleteCookie('username');
          deleteCookie('userRole');
        }
      } catch (error) {
        throw Error('Error trying to get profile.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="Home">
        {useSession().isLoggedIn ? (
          <>
            <Title level={2}>Bem-vindo, {getCookie('username')}.</Title>
            <Divider />
            <Title level={4}>UserID: {getCookie('userId')}</Title>
            <Title level={4}>Role: {getCookie('userRole')}</Title>
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
