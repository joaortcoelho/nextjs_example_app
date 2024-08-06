import React, { useEffect, useState } from 'react';
import { Menu, MenuProps, Image } from 'antd';
import { useRouter } from 'next/router';
import { useSession } from '@/context/sessionContext';
import {
  LoginOutlined,
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  StarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

type RouteInfo = {
  title: string;
  menuKey?: string;
};

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '/',
    label: 'Início',
    type: 'item',
    icon: <HomeOutlined />,
  },
  {
    key: 'login',
    label: 'Entrar',
    type: 'item',
    icon: <LoginOutlined />,
  },
  {
    key: 'register',
    label: 'Registar',
    type: 'item',
    icon: <UserOutlined />,
  },
];

const itemsLogged: MenuItem[] = [
  {
    key: '/',
    label: 'Início',
    type: 'item',
    icon: <HomeOutlined />,
  },
  {
    key: 'startups',
    label: 'Startups',
    type: 'item',
    icon: <UnorderedListOutlined />,
  },
  {
    key: 'favorites',
    label: 'Favoritos',
    type: 'item',
    icon: <StarOutlined />,
  },
  {
    key: 'profile',
    label: 'Perfil',
    type: 'item',
    icon: <UserOutlined />,
  },
  {
    key: 'logout',
    label: 'Terminar sessão',
    type: 'item',
    icon: <LogoutOutlined />,
    danger: true,
  },
];

const getRoute = (pathname: string): RouteInfo => {
  switch (pathname) {
    case '/':
      return { title: 'Início', menuKey: '' };
    case '/login':
      return { title: 'Entrar', menuKey: 'login' };
    case '/register':
      return { title: 'Registar', menuKey: 'register' };
    case '/startups':
      return { title: 'Startups', menuKey: 'startups' };
    case '/favorites':
      return { title: 'Favoritos', menuKey: 'favoritos' };
    case '/profile':
      return { title: 'Perfil', menuKey: 'profile' };
    case '/logout':
      return { title: 'Logout', menuKey: 'logout' };
    case '/_error':
      return { title: 'Error', menuKey: 'error' };
    default:
      throw Error(`No route declared with the key ${pathname}.`);
  }
};

const Nav: React.FC = () => {
  const router = useRouter();
  const route = getRoute(router.pathname);

  const { isLoggedIn } = useSession();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(isLoggedIn ? itemsLogged : items);

  useEffect(() => {
    setMenuItems(isLoggedIn ? itemsLogged : items);
  }, [isLoggedIn]);

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  return (
    <>
      <Image src="react.svg" width={60} alt="example" preview={false} style={{ paddingRight: 20 }} />
      <Menu
        theme="dark"
        onClick={onClick}
        style={{ flex: 1, minWidth: 0 }}
        defaultSelectedKeys={route.menuKey ? [route.menuKey] : undefined}
        mode="horizontal"
        items={menuItems}
      />
    </>
  );
};

export default Nav;
