import Title from "@components/Title";
import { Client } from "@notionhq/client";
import extractData from "@utils/extractData";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import { IPrompt } from "types";
import TextWithBreak from "@components/TextWithBreak";
import ReactMarkdown from "react-markdown";
import MarkDownRenderer from "@components/MarkDownRenderer";

export default function Post({ items }) {
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  const filteredItems = items.filter((item: IPrompt) => {
    return item.id === id;
  });

  return (
    <div className="mx-auto">
      <Title />

      <div className="mt-4"></div>

      <MarkDownRenderer text={filteredItems[filteredItems.length - 1].discussion} />
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
