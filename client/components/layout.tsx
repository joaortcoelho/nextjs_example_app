import React from 'react';
import { Route } from 'next';
import { Divider, MenuProps, Space, Typography, Breadcrumb, Flex, Layout, LayoutProps, theme, Menu } from 'antd';
import Nav from './navbar';

const { Header, Footer, Sider, Content } = Layout;

export type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    label,
    key,
    icon,
    children,
  } as MenuItem;
}

const AppLayout = ({ children }: LayoutProps) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'inline-flex', alignItems: 'start' }}>
        <Nav />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }} />
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>NextJS/AtnD @{new Date().getFullYear()} João Coelho</Footer>
    </Layout>
  );
};

export default AppLayout;
