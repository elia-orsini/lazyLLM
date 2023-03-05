import React, { useState } from "react";
import { Client } from "@notionhq/client";
import Item from "@components/Item";
import extractData from "@components/utils/extractData";
import downloadJSON from "@components/utils/downloadJSON";
import Title from "@components/Title";
import IPrompt from "types";
import Link from "next/link";

const IndexPage = ({ items, cognitiveBiases }) => {
  const [biasSelected, setBias] = useState("");

  let filteredArr = Object.values(
    items.reduce((acc, curr) => {
      if (!acc[curr.id]) {
        acc[curr.id] = curr;
      }
      return acc;
    }, {})
  );

  if (biasSelected) {
    filteredArr = filteredArr.filter((item: IPrompt) => {
      return item.cognitiveBias === biasSelected;
    });
  }

  return (
    <>
      <Title />

      <div className="mx-auto py-2 mt-2 flex">
        <select className="border border-black hover:bg-gray-200" onChange={(v) => setBias(v.target.value)}>
          <option value="">all biases</option>
          {cognitiveBiases.map((bias) => {
            return (
              <option key={bias} value={bias}>
                {bias}
              </option>
            );
          })}
        </select>

        <button
          onClick={() => {
            downloadJSON(filteredArr, "prompts.json");
          }}
          className="border border-black px-2 hover:bg-gray-200"
        >
          JSON
        </button>

        <Link href="/chatgptBattle" passHref>
          <button className="border border-black px-2 hover:bg-gray-200">chatGPT</button>
        </Link>
      </div>

      <div className="mx-auto my-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 mb-14">
        {filteredArr.map((item: IPrompt) => {
          return <Item key={item.id} content={item} fullData={items} />;
        })}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const notion = new Client({
    auth: process.env.SECRET,
  });

  const data = await notion.databases.query({
    database_id: process.env.PROMPTS_ID,
  });

  const cleanData = data.results.map((item) => {
    return extractData(item);
  });

  const cognitiveBiases = Array.from(new Set(cleanData.map((obj) => obj.cognitiveBias)));

  return {
    props: {
      items: cleanData,
      cognitiveBiases: cognitiveBiases,
    },
    revalidate: 3600, // revalidate every hour
  };
};

export default IndexPage;
