import React, { useEffect, useState } from "react";
import { Client } from "@notionhq/client";
import Item from "@components/Item";
import extractData from "@utils/extractData";
import Title from "@components/Title";
import { IPrompt } from "types";
import Footer from "@components/Footer";

const IndexPage = ({ items, cognitiveBiases }) => {
  const [biasSelected, setBias] = useState("");
  const [showOnlyTested, setShowOnlyTested] = useState(false);

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

  if (showOnlyTested) {
    filteredArr = filteredArr.filter((item: IPrompt) => {
      return item.tested === true;
    });
  }

  return (
    <>
      <div className="mx-auto w-10/12">
        <Title />

        <div className="mx-auto py-2 mt-2 grid grid-cols-2">
          <div>
            <select className="border px-1 h-full border-black hover:bg-gray-200" onChange={(v) => setBias(v.target.value)}>
              <option value="">all biases</option>
              {cognitiveBiases.map((bias: string) => {
                return (
                  <option key={bias} value={bias}>
                    {bias}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="inline text-right text-xs my-auto">
            <span>{filteredArr.length} experiments</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredArr.map((item: IPrompt) => {
            return <Item key={item.id} content={item} fullData={items} />;
          })}
        </div>

        <Footer />
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

  const cognitiveBiases = Array.from(
    new Set(cleanData.map((obj) => obj.cognitiveBias))
  );

  return {
    props: {
      items: cleanData,
      cognitiveBiases: cognitiveBiases,
    },
    revalidate: 3600, // revalidate every hour
  };
};

export default IndexPage;
