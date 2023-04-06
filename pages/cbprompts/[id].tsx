import ItemDetailed from "@components/ItemDetailed";
import Title from "@components/Title";
import downloadJSON from "@utils/downloadJSON";
import extractData from "@utils/extractData";
import { Client } from "@notionhq/client";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { IPrompt } from "types";
import { useState } from "react";

export default function Post({ items }) {
  const [showDiscussion, setShowDiscussion] = useState<boolean>(false);

  const router = useRouter();
  const id = parseInt(router.query.id as string);

  const filteredItems = items.filter((item: IPrompt) => {
    return item.id === id;
  });

  const allElementsPresent = filteredItems[0].variants === filteredItems.length;
  const allVariantsTested = filteredItems.every((item: IPrompt) => item.tested);
  const discussionPresent = filteredItems.every((item: IPrompt) => item.discussion !== "");

  return (
    <div className="mx-auto">
      <Title />

      <div className="mt-4 w-full text-center my-4 grid sm:grid-cols-2">
        <div className="text-left">
          <button
            onClick={() => {
              downloadJSON(filteredItems, `${filteredItems[0].id}.json`);
            }}
            className="hover:bg-gray-300 bg-gray-200 px-1 font-mono text-sm"
          >
            download as json
          </button>

          {discussionPresent && (
            <Link href={`/discussion/${id}`} passHref>
              <button className="hover:bg-gray-300 bg-gray-200 px-1 font-mono text-sm ml-4">show discussion</button>
            </Link>
          )}
        </div>

        <div className="text-right text-sm my-auto">
          {filteredItems[0].cognitiveBias} - {filteredItems[0].participants} participants -
          <span className="border-black px-2">{allElementsPresent ? "all variants present" : "missing variants"}</span>-{" "}
          <span className={`border-black`}>{allVariantsTested ? "tested" : "not tested yet"} </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {filteredItems.map((item: IPrompt) => {
          return <ItemDetailed key={item.id} content={item} />;
        })}
      </div>
    </div>
  );
}

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

  return {
    props: {
      items: cleanData,
    },
    revalidate: 3600, // revalidate every hour
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};
