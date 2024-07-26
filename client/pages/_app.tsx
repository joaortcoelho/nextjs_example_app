import React from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/globals.css';
import { SessionProvider } from '@/context/session';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default App;
