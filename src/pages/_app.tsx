import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { store, persistor } from "./../../src/store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.css";
import { useEffect } from "react";

function CustomApp({ Component, pageProps }: AppProps) {
  const state = store.getState();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>EchoLink</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta
          content="Premium Multipurpose Admin & Dashboard Template"
          name="deScription"
        />
        <meta content="Themesbrand" name="author" />

        <link rel="apple-touch-icon" href="/assets/Metaponder512x512.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/Metaponder512x512.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/Metaponder512x512.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/assets/Metaponder512x512.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/Metaponder512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/Metaponder512x512.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/assets/Metaponder512x512.png"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon.ico" />


        <meta property="og:type" content="website" /> */}

        {/* Pwa Ends */}
        <link
          rel="icon"
          type="image/x-icon"
          href="/assets/images/favicon.ico"
        />

        {/* <link
          rel="stylesheet"
          href="/assets/css/preloader.min.css"
          type="text/css"
        /> */}

        <link
          href="/assets/css/bootstrap.min.css"
          rel="stylesheet"
          type="text/css"
        />

        <link
          href="/assets/css/icons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <link href="/assets/css/app.min.css" rel="stylesheet" type="text/css" />
      </Head>
      {/* <script
        src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
        integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></script> */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></script>
      {/* <Script
        src="/assets/libs/metismenu/metisMenu.min.js"
        strategy="beforeInteractive"
      ></Script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/simplebar/4.2.3/simplebar.min.js"
        integrity="sha512-ru0JkTo+U6A7HVuiN5qdBn53K/l/ybnA3Y1rcIU4V1h/dSkDrhyvxQJne7qklbON3RvWWknrbTOSciGW5geDbQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/pace/1.2.4/pace.min.js"
        integrity="sha512-2cbsQGdowNDPcKuoBd2bCcsJky87Mv0LEtD/nunJUgk6MOYTgVMGihS/xCEghNf04DPhNiJ4DZw5BxDd1uyOdw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/node-waves/0.7.6/waves.min.js"
        integrity="sha512-MzXgHd+o6pUd/tm8ZgPkxya3QUCiHVMQolnY3IZqhsrOWQaBfax600esAw3XbBucYB15hZLOF0sKMHsTPdjLFg=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.29.0/feather.min.js"
        integrity="sha512-24XP4a9KVoIinPFUbcnjIjAjtS59PUoxQj3GNVpWc86bCqPuy3YxAcxJrxFCxXe4GHtAumCbO2Ze2bddtuxaRw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></script>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"
        integrity="sha512-r22gChDnGvBylk90+2e/ycr3RVrDi8DIOkIGNhJlKfuyQM4tIRAI062MaV8sfjQKYVGjOBaZBOA87z+IhZE9DA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      ></script> */}

      {/* <Script src="/assets/js/app.js"></Script> */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default CustomApp;
