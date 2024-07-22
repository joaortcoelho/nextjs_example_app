import React from 'react';
import { useRouter } from 'next/router';
import Navbar from './navbar';
import { Flex, Layout, LayoutProps } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

type RouteInfo = {
  title: string | null;
  menuKey?: string;
};

const getRoute = (pathname: string): RouteInfo => {
  switch (pathname) {
    case '/home':
      return { title: null };
    case '/startups':
      return { title: 'Startups', menuKey: 'startups' };
    case '/login':
      return { title: 'Login', menuKey: 'login' };
    case '/register':
      return { title: 'Register', menuKey: 'register' };
    case '[id]/favoritos':
      return { title: 'Favoritos', menuKey: 'favoritos' };
    default:
      throw Error('No route declarared with the key ${pathname}.');
  }
};

const AppLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const route = getRoute(router.pathname);

  return (
    <Flex gap="middle" wrap>
      <Layout hasSider>
        <Sider width="25%">
          <Navbar />
        </Sider>
        <Header>{route.title}</Header>
        <Content>{children}</Content>
        <Footer></Footer>
      </Layout>
    </Flex>
  );
};

export default AppLayout;
