import Head from "next/head";
import React from "react";

function Header({
  title = "lazyLLM",
  description = "lazyLLM is a set of tools for creating prompts, testing them on Large Language Models (LLMs) and analyze their results. lazyLLM contains a large dataset of prompts for cognitive biases and, additionally, it stores the OpenAI evals set of prompts.",
  img = "/dalle7.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />

      <meta property="og:image" content={img} />
      <meta property="twitter:image" content={img} />
    </Head>
  );
}

export default Header;
