import React from 'react';
import { Menu, MenuProps, Image } from 'antd';
import { useRouter } from 'next/router';
import MenuItem from 'antd/es/menu/MenuItem';
import { LoginOutlined, UserOutlined, HomeOutlined, UnorderedListOutlined, StarOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    key: 'home',
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
    label: 'Criar conta',
    type: 'item',
    icon: <UserOutlined />,
  },
];
const itemsLogged: MenuItem[] = [
  {
    key: 'home',
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
    key: 'favoritos',
    label: 'Favoritos',
    type: 'item',
    icon: <StarOutlined />,
  },
];

type RouteInfo = {
  title: string | null;
  icon?: React.ReactNode;
  menuKey?: string;
};
const getRoute = (pathname: string): RouteInfo => {
  switch (pathname) {
    case '/home':
      return { title: 'Home', menuKey: 'home' };
    case '/startups':
      return { title: 'Startups', menuKey: 'startups' };
    case '/login':
      return { title: 'Login', menuKey: 'login' };
    case '/register':
      return { title: 'Register', menuKey: 'register' };
    case '/favoritos':
      return { title: 'Favoritos', menuKey: 'favoritos' };
    default:
      throw Error('No route declarared with the key ${pathname}.');
  }
};

const Nav: React.FC = () => {
  const router = useRouter();
  const route = getRoute(router.pathname);

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key); // use router to push key in MenuItem
    console.log('click', e);
  };

  return (
    <>
      <Image src="react.svg" width={60} alt="example" preview={false} style={{ paddingRight: 20 }} />
      <Menu
        theme="dark"
        onClick={onClick}
        style={{ flex: 1, minWidth: 0 }}
        defaultSelectedKeys={[route.title as string]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};

export default Nav;
