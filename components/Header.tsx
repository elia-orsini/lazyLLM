import Head from "next/head";
import React from "react";

function Header({
  title = "lazyLLM",
  description = "lazyLLM - A set of tools for testing prompts on large language models (LLMs).",
  img = "/dalle7.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />

      <meta name="description" content={description} key="desc" />
      <meta property="og:description" content={description} />

      <meta property="og:image" content={img} />
      <meta property="twitter:image" content={img} />
    </Head>
  );
}

export default Header;
