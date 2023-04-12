import downloadJSON from "@utils/downloadJSON";
import { useState } from "react";

export default function FreeMode() {
  const [promptsText, setPromptsText] = useState([]);
  const [systemTexts, setSystemTexts] = useState([]);
  const [ideals, setIdeals] = useState([]);

  const addToDataset = (e) => {
    e.preventDefault();

    setSystemTexts((systemTexts) => [...systemTexts, e.target[0].value]);

    setPromptsText((promptsText) => [...promptsText, e.target[1].value]);

    setIdeals((ideals) => [...ideals, e.target[2].value]);
  };

  const JSONDownload = () => {
    const JSON = [];
    for (let i = 0; i < systemTexts.length; i++) {
      if (systemTexts.length !== promptsText.length) return;

      const formattedPrompt = {
        input: [
          {
            role: "system",
            content: systemTexts[i],
          },
          {
            role: "user",
            content: promptsText[i],
          },
        ],
        ideal: ideals[i],
      };

      JSON.push(formattedPrompt);
    }

    downloadJSON(JSON, "customPrompts_lazyLLM.json");
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

      <>
        <form
          onSubmit={(e) => {
            addToDataset(e);
          }}
        >
          <p className="uppercase mt-10 font-bold text-xs">system prompt</p>
          <textarea className="border rounded border-black w-full px-2 py-2 font-semibold text-sm"></textarea>

          <p className="uppercase font-bold text-xs mt-2">user prompt</p>
          <textarea className="border rounded border-black w-full px-2 py-2 font-semibold text-sm"></textarea>

          <div className="mt-2">
            <span className="uppercase font-bold text-xs">ideal output</span>
            <input
              className="border border-black mx-2"
              type="text"
              name="ideal"
            />
          </div>

          <button className="bg-black text-white px-2 mt-4">add</button>
        </form>
      </>
    </div>
  );
}
