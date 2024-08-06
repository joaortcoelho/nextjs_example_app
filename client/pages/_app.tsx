import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import Layout from '@/components/layout';
import '../styles/globals.css';
import { SessionProvider } from '@/context/sessionContext';

const App = ({ Component, pageProps }: AppProps) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <SessionProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      )}
    </>
  );
};

export default App;
