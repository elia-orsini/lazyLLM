import ItemDetailed from "@components/ItemDetailed";
import Title from "@components/Title";
import downloadJSON from "@components/utils/downloadJSON";
import extractData from "@components/utils/extractData";
import { Client } from "@notionhq/client";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import IPrompt from "types";

export default function Post({ items }) {
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  const filteredItems = items.filter((item: IPrompt) => {
    return item.id === id;
  });

  const allElementsPresent = filteredItems[0].variants === filteredItems.length;

  return (
    <>
      <div>
        <Link href="/" passHref>
          <button className="border border-black px-2 ml-5 mt-10">back</button>
        </Link>
      </div>

      <Title />

      <div className="bg-gray-200 mt-4">
        <div className="mx-auto w-max text-center border border-black bg-white my-4 grid sm:grid-cols-2">
          <div className="sm:border-r border-black">
            <p className="font-semibold px-4">{filteredItems[0].cognitiveBias}</p>
            <p className="">{filteredItems[0].participants} participants</p>
            {allElementsPresent ? <p className="bg-green-600">all variants present</p> : <p className="bg-red-600">missing variants</p>}
            <button
              onClick={() => {
                downloadJSON(filteredItems, "prompts.json");
              }}
              className="border-t border-black w-full bg-black text-white"
            >
              download
            </button>
          </div>

          <div className="grid grid-cols-3">
            <div className="text-left col-span-2">
              {filteredItems[0].metricType.split(/;/).map((metric: string) => {
                return (
                  <p key={metric} className="font-semibold px-2 border-b">
                    {metric}
                  </p>
                );
              })}
            </div>

            <div className="text-right">
              {filteredItems[0].metricType.split(/;/).map((metric: string) => {
                return (
                  <p key={metric} className="font-semibold px-2 border-b">
                    0.2
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 mb-14">
        {filteredItems.map((item: IPrompt) => {
          return <ItemDetailed key={item.id} content={item} />;
        })}
      </div>
    </>
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
