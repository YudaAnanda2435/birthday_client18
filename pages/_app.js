// pages/_app.js
import React from "react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Head>
        <title>special for u </title>
        <meta
          name="description"
          content="Retro Windows 95 style birthday card"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000080" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
     
        <link rel="icon" href="/gallery/love.png" sizes="any" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}

export default MyApp;
