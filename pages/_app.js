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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />

        <title>lazyLLM</title>
        <meta name="title" content="lazyLLM" />
        <meta property="og:title" content="lazyLLM" />
        <meta name="og:site_name" content="lazyLLM" />

        <meta property="twitter:title" content="lazyLLM" />
        <meta property="twitter:image" content="/lazyLLMlogo.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="Description"
          content="lazyLLM is a set of tools for creating prompts, testing them on Large Language Models (LLMs) and analyze their results. lazyLLM contains a large dataset of prompts for cognitive biases and, additionally, it stores the OpenAI evals set of prompts."
        />
        <meta
          property="og:description"
          content="lazyLLM is a set of tools for creating prompts, testing them on Large Language Models (LLMs) and analyze their results. lazyLLM contains a large dataset of prompts for cognitive biases and, additionally, it stores the OpenAI evals set of prompts."
        />

        <link rel="shortcut icon" href="/lazyLLMlogo.png" />
        <link rel="icon" href="/lazyLLMlogo.png" />

        <meta name="author" content="elia orsini" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
