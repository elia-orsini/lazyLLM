import Title from "@components/Title";
import { Client } from "@notionhq/client";
import extractData from "@utils/extractData";
import { useRouter } from "next/router";
import { GetStaticPaths } from "next";
import { IPrompt } from "types";
import MarkDownRenderer from "@components/MarkDownRenderer";
import { useEffect, useState } from "react";
import { Grid, AutoSizer } from "react-virtualized";

export default function Post({ items }) {
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  const [data, setData] = useState([{ c: "experiment id", a: "original result", b: "edited result" }]);

  useEffect(() => {
    const fetchData = async () => {
      for (let i = 0; i < filteredItems.length; i++) {
        fetch(`/archive/results/${id}-${i + 1}.json`)
          .then((response) => response.json())
          .then((jsonData) => {
            const newObj = jsonData.responses.map((item) => {
              return { experiment: i + 1, edited: item.edited, text: item.text };
            });

            setData((prevData) => [...prevData, ...newObj]);
          });
      }
    };

    fetchData();
  }, []);

  const filteredItems = items.filter((item: IPrompt) => {
    return item.id === id;
  });

  function cellRenderer({ columnIndex, key, rowIndex, style }) {
    return (
      <div key={key} style={style} className={`border border-black pl-2 text-xs ${rowIndex === 0 && "bg-gray-700 text-white"}`}>
        {Object.values(data[rowIndex])[columnIndex].toString().slice(0, 55)}
      </div>
    );
  }

  function _getColumnWidth({ index }) {
    switch (index) {
      case 0:
        return 100;
      case 1:
        return 100;
      case 2:
        return 350;
      default:
        return 150;
    }
  }

  function _getRowHeight({ index }) {
    return 20;
  }

  return (
    <div className="mx-auto">
      <Title />

      <div className="mt-4"></div>

      <MarkDownRenderer text={"## discussion \n" + filteredItems[filteredItems.length - 1].discussion + "\n ## raw experiment results"} />

      <AutoSizer disableHeight>
        {({ width }) => (
          <Grid
            className="grid grid-cols-2 w-full mt-4"
            cellRenderer={cellRenderer}
            columnCount={data[0] ? Object.keys(data[0]).length : 0}
            columnWidth={_getColumnWidth}
            height={300}
            rowCount={data.length}
            rowHeight={_getRowHeight}
            width={width}
          />
        )}
      </AutoSizer>
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
