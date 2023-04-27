import downloadJSON from "@utils/downloadJSON";
import { useEffect, useState } from "react";

export default function TemplateMode() {
  const [promptText, setPromptText] = useState("");
  const [systemText, setSystemText] = useState("");
  const [variables, setVariables] = useState([]);
  const [datasetValues, setDatasetValues] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [ideals, setIdeals] = useState([]);

  useEffect(() => {
    const regex = /<(\w+)>/g;
    const matches = [];
    let match;

    while ((match = regex.exec(promptText)) !== null) {
      matches.push(match[1]);
    }

    setVariables(matches);
  }, [promptText]);

  const substituteWords = (dataset) => {
    const tagRegex = /<\w+>/g;

    const newDataset = [];

    for (let i = 0; i < dataset.length; i++) {
      const substitutedText = promptText.replace(tagRegex, (match) => {
        const tag = match.slice(1, -1);

        if (dataset[i][tag]) {
          return dataset[i][tag];
        }

        return match;
      });

      newDataset.push(substitutedText);
    }
    setDataset(newDataset);
  };

  const addToDataset = (e) => {
    e.preventDefault();

    const values = {};

    for (let i = 0; i < e.target.length - 2; i++) {
      values[variables[i]] = e.target[i].value;
    }

    setDatasetValues((datasetValues) => [...datasetValues, values]);

    setIdeals([...ideals, e.target[e.target.length - 2].value]);

    substituteWords([...datasetValues, values]);

    for (let i = 0; i < e.target.length - 1; i++) {
      e.target[i].value = "";
    }
  };

  const JSONDownload = () => {
    const JSON = [];
    for (let i = 0; i < dataset.length; i++) {
      const userPrompt = dataset[i];

      const formattedPrompt = {
        input: [
          {
            role: "system",
            content: systemText,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        ideal: ideals[i],
      };

      JSON.push(formattedPrompt);
    }

    downloadJSON(JSON, "templateBasedPrompts_lazyLLM.json");
  };

  return (
    <div>
      <div>
        <button
          className={`uppercase px-2 bg-black text-white text-xs`}
          onClick={() => {
            JSONDownload();
          }}
        >
          download as json
        </button>
      </div>

      <p className="uppercase mt-10 font-bold text-xs">system prompt</p>
      <textarea
        onChange={(e) => {
          setSystemText(e.target.value);
        }}
        className="border rounded border-black w-full px-2 py-2 font-semibold text-sm"
      ></textarea>

      <p className="uppercase font-bold text-xs mt-2">user prompt</p>
      <textarea
        onChange={(e) => {
          setPromptText(e.target.value);
        }}
        className="border rounded border-black w-full px-2 py-2 font-semibold text-sm"
      ></textarea>

      <form
        onSubmit={(e) => {
          addToDataset(e);
        }}
      >
        <p className="uppercase font-bold text-xs mt-2">VARIABLES</p>

        {variables.length > 0 && (    
          <div className="border border-black rounded px-2 py-1">
            {variables.map((variable, i) => {
              return (
                <div key={i} className="grid grid-cols-3 w-6/12">
                  <div className="inline my-auto">{`${variable}: `}</div>
                  <input
                    className="border px-2 col-span-2 border-black my-1 w-full"
                    type="text"
                    name={variable}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8">
          <span className="uppercase font-bold text-xs">ideal output</span>
          <input
            className="border border-black mx-2"
            type="text"
            name="ideal"
          />
        </div>

        <button className="bg-black text-white px-2 mt-4">add</button>
      </form>
    </div>
  );
}
