import React from 'react';
import { Menu, MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'home',
    label: 'Home',
    type: 'item',
  },
  {
    key: 'startups',
    label: 'Startups',
    type: 'item',
  },
  {
    key: 'login',
    label: 'Login',
    type: 'item',
  },
  {
    key: 'register',
    label: 'Register',
    type: 'item',
  },
];

const Nav: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };
  return <Menu onClick={onClick} style={{ width: 256 }} defaultSelectedKeys={['1']} mode="inline" items={items} />;
};

export default Nav;
