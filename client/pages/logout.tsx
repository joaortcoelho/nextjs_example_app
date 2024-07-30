import { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import { useSession } from '@/context/session';
import { deleteCookie } from 'cookies-next';

const Logout = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useSession();

  useEffect(() => {
    setIsLoggedIn(false);
    deleteCookie('token');
    deleteCookie('userId');
    router.push('/login'); // Redirect to login page after logout
  }, [router, setIsLoggedIn]);

  return (
    <div className="Logout">
      <Breadcrumb style={{ fontSize: 18 }} items={[{ title: 'Sessão terminada.' }]} />
    </div>
  );
};

export default Logout;
