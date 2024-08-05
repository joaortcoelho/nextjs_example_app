import { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import { useSession } from '@/context/session';
import { deleteCookie } from 'cookies-next';

const Logout = () => {
  const router = useRouter();
  const { isLoggedIn, setLogout } = useSession();

  useEffect(() => {
    setLogout()

    router.push('/login'); // Redirect to login page after logout
  }, [router, isLoggedIn, setLogout]);

  return (
    <div className="Logout">
      <Breadcrumb style={{ fontSize: 18 }} items={[{ title: 'Sessão terminada.' }]} />
    </div>
  );
};

export default Logout;
