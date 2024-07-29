import React, { useEffect, useState } from 'react';
import { Menu, MenuProps, Image } from 'antd';
import { useRouter } from 'next/router';
import { useSession } from '@/context/session';
import {
  LoginOutlined,
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  StarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

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
    label: 'Registar',
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
  {
    key: 'logout',
    label: 'Terminar sessão',
    type: 'item',
    icon: <LogoutOutlined />,
    danger: true,
  },
];

const Nav: React.FC = () => {
  const router = useRouter();

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
        defaultSelectedKeys={[router.pathname]}
        mode="horizontal"
        items={menuItems}
      />
    </>
  );
};

export default Nav;
