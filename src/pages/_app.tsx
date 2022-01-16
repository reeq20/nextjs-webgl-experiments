import '@/styles/globals.css';
import {AppProps} from 'next/app';
import Header from '@/components/layouts/Header';

const  App = ({ Component, pageProps }: AppProps) => {
  return (
      <>
        <Header />
        <Component {...pageProps} />
      </>
  );
};

export default App;
