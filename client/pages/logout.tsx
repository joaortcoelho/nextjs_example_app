import { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import { useSession } from '@/context/sessionContext';
import { deleteCookie, getCookie } from 'cookies-next';

const Logout = () => {
  const router = useRouter();
  const { isLoggedIn, setLogout } = useSession();

  useEffect(() => {
    setLogout();
    deleteCookie('token');
    if (getCookie('rememberMe') === 'false') {
      deleteCookie('username');
    }
    router.push('/login'); // Redirect to login page after logout
  }, [router, isLoggedIn, setLogout]);

  return (
    <div className="Logout">
      <Breadcrumb style={{ fontSize: 18 }} items={[{ title: 'Sessão terminada.' }]} />
    </div>
  );
};

export default Logout;
