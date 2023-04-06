import React, { useEffect, useState } from "react";

import YAML from "js-yaml";
import Link from "next/link";
import EvalItem from "@components/EvalItem";
import Title from "@components/Title";
import Footer from "@components/Footer";

const EvalsList = () => {
  const yamlFilePath = "/evals/aba-mrpc-true-false.yaml";
  const evalsListPath = "evalsFilenames.json";

  const [yamlData, setYamlData] = useState(null);
  const [evalsList, setEvalsList] = useState(null);

  useEffect(() => {
    fetch(evalsListPath)
      .then((response) => response.text())
      .then((text) => {
        setEvalsList(JSON.parse(text));
      });

    fetch(yamlFilePath)
      .then((response) => response.text())
      .then((text) => {
        const data = YAML.load(text);
        setYamlData(data);
      })
      .catch((error) => console.error("Error reading YAML file:", error));
  }, []);

  console.log(evalsList);

  return (
    <div className="w-10/12 mx-auto h-screen">
      <Title
        includeDefaultLinks={false}
        title="lazyLLM"
        links={[{ text: "home", action: "/" }]}
      />

      <div className="flex flex-col h-3/6">
        <div
          className="bg-white h-full"
          style={{
            backgroundImage: `url('dalle6.png')`,
            backgroundSize: "cover",
            backgroundPositionY: "13%",
            // textShadow:
            //   "-0.7px -0.7px 0 #000, 0.7px -0.7px 0 #000, -0.7px 0.7px 0 #000, 0.7px 0.7px 0 #000",
          }}
        ></div>
        <p className="mt-5 text-center w-full my-auto text-lg text-black font-semibold mx-10">
          evals is a framework from openAI which collects datasets of prompts
          for evaluating language models. <br />
          select any of the available datasets below to see their descriptions
          and test them with our tool.
        </p>
      </div>

      <div className="grid grid-cols-3 mt-10">
        {evalsList &&
          evalsList.map((item, i) => <EvalItem key={i} item={item} />)}
      </div>

      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      secret: process.env.OPEN_AI_SECRET,
    },
  };
};

export default EvalsList;
