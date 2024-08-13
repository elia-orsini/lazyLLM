import "../css/index.css";
import Head from "next/head";
import Layout from "@components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />

        <title>lazyLLM</title>
        <meta name="title" content="lazyLLM" />
        <meta property="og:title" content="lazyLLM" />

        <meta
          name="Description"
          content="lazyLLM - A set of tools for testing prompts on large language models (LLMs)."
        />
        <meta
          property="og:description"
          content="lazyLLM - A set of tools for testing prompts on large language models (LLMs)."
        />

        <link rel="icon" href="/lazyLLMlogo.png" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
