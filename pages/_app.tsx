import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Head>
        <title>DarkPaste - Email Anônimo</title>
        <meta name="description" content="Sistema de email totalmente privado e anônimo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="referrer" content="no-referrer" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔒</text></svg>" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
