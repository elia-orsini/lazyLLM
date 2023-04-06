import Title from "@components/Title";
import YAML from "js-yaml";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ChatMessage, EvalYAMLFile } from "types";
import PromptVisualiser from "@components/PromptVisualiser";

export default function Eval({ items }) {
  const router = useRouter();
  const id = router.query.id as string;

  const [evalDataPath, setEvalDataPath] = useState<any>(null);
  const [evalsData, setEvalsData] = useState<any>(null);
  const [evalsDesc, setEvalsDesc] = useState<any>(null);

  useEffect(() => {
    const path = `/evals/${id}`;

    id &&
      fetch(path)
        .then((response) => response.text())
        .then((text) => {
          const data = YAML.load(text) as EvalYAMLFile;

          setEvalDataPath(
            `/evalsData/${Object.values(data)[1].args.samples_jsonl}`
          );
          setEvalsDesc(Object.values(data)[0].description);
        })
        .catch((error) => console.error("Error reading YAML file:", error));
  }, [id]);

  useEffect(() => {
    evalDataPath &&
      fetch(evalDataPath)
        .then((response) => response.text())
        .then((text) => {
          const lines = text.trim().split("\n");
          const data = lines.map((line) => JSON.parse(line)) as [ChatMessage];

          setEvalsData(data);
        })
        .catch((error) => console.error("Error reading YAML file:", error));
  }, [evalDataPath]);

  return (
    <div>
      <div className="mx-auto w-10/12">
        <Title
          title={id && id.slice(0, id.length - 5)}
          includeDefaultLinks={false}
          links={[
            { text: "import", action: `/chatgptbattleeval/${id}` },
            { text: "evals", action: "/evalslist" },
          ]}
        />

        <p className="uppercase text-xs mt-10">description</p>
        {evalsDesc ? (
          <div className="text-lg">{evalsDesc}</div>
        ) : (
          <div>no description offered</div>
        )}

        <div className="uppercase text-sm mt-6">
          <span className="font-bold">{evalsData && evalsData.length}</span>{" "}
          different prompts
        </div>

        <div className="uppercase text-sm mt-6">
          <p className="text-xs">examples</p>
          {console.log(evalsData)}
          {evalsData &&
            evalsData.slice(0, 3).map((item, index) => (
              <div key={index} className="py-2">
                <PromptVisualiser evalSample={item} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
