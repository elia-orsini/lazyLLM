import "../css/index.css";
import Head from "next/head";
import Layout from "@components/layout";
import { withPasswordProtect } from "next-password-protect";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>prompts for cognitive biases</title>
        <meta name="Description" content="prompts for cognitive biases" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
