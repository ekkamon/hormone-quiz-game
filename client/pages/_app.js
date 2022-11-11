import '../styles/globals.css';
import Head from 'next/head';
import { store } from '../store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setConnection] = useState(false);

  useEffect(() => {
    socket?.disconnect();
  }, []);

  // connect server app
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_API_SERVER);

    newSocket.on('connect', () => {
      setSocket(newSocket);
      setConnection(true);
    });

    newSocket.on('disconnect', () => setConnection(false));
  }, []);

  if (!isConnected) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0"
        />
        <title>Hormone Quiz</title>
      </Head>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} socket={socket} />
      </Provider>
    </>
  );
}

export default MyApp;
