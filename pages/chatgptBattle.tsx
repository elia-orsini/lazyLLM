import React, { useState } from "react";
import axios from "axios";
import downloadJSON from "@utils/downloadJSON";
import { IMessage, PromptObject } from "types";
import { withPasswordProtect } from "next-password-protect";

const Gpt3Request = ({ secret }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [responses, setResponses] = useState<Array<IMessage>>([]);

  const [numberOfTimes, setNumberOfTimes] = useState<number>(1);

  const [maxTokens, setMaxTokens] = useState<number>(50);
  const [temperature, setTemperature] = useState<number>(1);
  const [topP, setTopP] = useState<number>(0.1);

  const [prompts, setPrompts] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [experimentID, setExperimentID] = useState<number>();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const jsonData = JSON.parse(event.target?.result as string) as PromptObject[];
      const promptsArray = jsonData.map((obj) => obj.prompt);
      setExperimentID(jsonData[0].id);
      promptsArray.reverse();
      setPrompts(["", ...promptsArray]);
    };

    reader.readAsText(file as Blob);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<Array<string>> => {
    event.preventDefault();
    const API_KEY = secret;
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const responses = [];

    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-3.5-turbo-0301",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: maxTokens,
          n: numberOfTimes,
          temperature: temperature,
          top_p: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      response.data.choices.map((choice) =>
        responses.push({
          text: choice.message.content,
          edited: choice.message.content,
          index: choice.index,
          finishReason: choice.finish_reason,
        })
      );
    } catch (error) {
      console.error(error);
    }

    setResponses(responses);

    return responses;
  };

  const customEdit = (event: React.FormEvent<HTMLFormElement>, item: IMessage): void => {
    event.preventDefault();

    const newValue = event.target[0].value;

    responses[item.index].edited = newValue;
  };

  const triggerDownloadJSON = () => {
    const jsonFile = {
      prompt: prompt,
      maxTokens: maxTokens,
      temperature: temperature,
      topP: topP,
      responses: responses,
    };

    downloadJSON(jsonFile, `${experimentID}-${currentIndex}`);
  };

  return (
    <div className="mx-auto h-screen w-full px-10">
      <h3 className="font-bold text-xl text-center mt-10">CHATGPT BATTLE MODE</h3>

      <form className="w-full bg-gray-200 rounded-xl" onSubmit={handleSubmit}>
        <div className="grid items-center px-3 rounded-xl py-3 mt-4 border border-black">
          <div className="flex">
            <input type="file" accept=".json" onChange={handleFileUpload} />

            <button
              type="button"
              className="px-2 border border-black hover:bg-gray-200"
              onClick={() => {
                currentIndex > 0 && setCurrentIndex(currentIndex - 1);
                setPrompt(prompts[currentIndex - 1]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>

            <button
              type="button"
              className="px-2 border border-black hover:bg-gray-200"
              onClick={() => {
                currentIndex < prompts.length - 1 && setCurrentIndex(currentIndex + 1);
                setPrompt(prompts[currentIndex + 1]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </button>

            <p className="border border-black px-2 ml-10">
              current index: {currentIndex} / {prompts.length > 0 ? prompts.length - 1 : 0}
            </p>
          </div>

          <div className="flex mt-4">
            <textarea
              rows={3}
              id="chat"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              className="block mr-2 p-2.5 h-20 w-full text-sm text-gray-900 bg-white rounded-lg border border-black"
              placeholder="Your prompt..."
            />

            <button type="submit" className="inline-flex my-auto justify-center px-2 text-blue-600 rounded-lg cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="black" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
            </button>
          </div>

          <div className="flex gap-5">
            <div className="flex mt-3  w-max rounded-lg">
              <button
                type="button"
                className={`border mx-auto my-auto border-black uppercase px-3 bg-white hover:bg-black hover:text-white`}
                onClick={() => triggerDownloadJSON()}
              >
                download json
              </button>
            </div>

            <div className="flex flex-col mt-3 border-black border w-max rounded-lg bg-white">
              <p className="bg-gray-50 w-full rounded-t-lg px-2 border-b border-black text-sm font-semibold">SETTINGS</p>
              <div className="flex px-4 py-3">
                <label className="mr-2 my-auto text-sm uppercase">repetitions: </label>
                <input
                  type="number"
                  min="1"
                  value={numberOfTimes}
                  onChange={(event) => setNumberOfTimes(parseInt(event.target.value))}
                  className="block w-16 mr-2 py-1 px-2.5 text-sm text-gray-900 bg-white rounded-lg border border-black"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex flex-col mt-3 border-black border w-max rounded-lg text-sm bg-white">
              <p className="bg-gray-50 w-full rounded-t-lg px-2 border-b border-black font-semibold">EXTRA PARAMETERS</p>
              <div className="flex px-4 py-3">
                <label className="mr-2 my-auto uppercase">max tokens: </label>
                <input
                  type="number"
                  min="1"
                  value={maxTokens}
                  onChange={(event) => setMaxTokens(parseInt(event.target.value))}
                  className="block w-16 mr-2 py-1 px-2.5 text-gray-900 bg-white rounded-lg border border-black"
                  placeholder="7"
                />

                <label className="mr-2 my-auto uppercase">temperature: </label>
                <input
                  type="number"
                  step="0.1"
                  max="2"
                  min="0"
                  value={temperature}
                  onChange={(event) => setTemperature(parseFloat(event.target.value))}
                  className="block w-16 mr-2 py-1 px-2.5 text-gray-900 bg-white rounded-lg border border-black"
                  placeholder="7"
                />

                <label className="mr-2 my-auto uppercase">top P: </label>
                <input
                  type="number"
                  step="0.1"
                  max="1"
                  min="0"
                  value={topP}
                  onChange={(event) => setTopP(parseFloat(event.target.value))}
                  className="block w-16 mr-2 py-1 px-2.5 text-gray-900 bg-white rounded-lg border border-black"
                  placeholder="7"
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      <h3 className="font-semibold text-lg mt-10">RESULTS</h3>
      {responses.length > 0 ? (
        <div className="border-t border-l border-r mt-1 border-black rounded">
          {responses.map((item) => (
            <div key={item.index} className="py-2 px-2 border-b border-black flex flex-col">
              <p>{item.text}</p>

              <form className="mt-2 mr-40" onSubmit={(event) => customEdit(event, item)}>
                <label className="mr-2 my-auto text-sm uppercase">edit answer:</label>
                <input type="text" className="px-4 border border-black" />
                <button type="submit" className="px-2 border-t border-r border-b border-black hover:bg-gray-200">
                  Edit
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-t border-l border-r mt-1 border-black rounded scrollable max-h-11 overflow-scroll">
          {[[], [], [], [], [], [], [], [], [], [], [], []].slice(0, numberOfTimes).map((i) => {
            return <div key={Math.random()} className=" py-2 px-2 h-16 border-b border-black flex flex-col"></div>;
          })}
        </div>
      )}

      <div className="mt-40">
        <h3 className="font-semibold text-lg text-center text-white">.</h3>
      </div>
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

export default withPasswordProtect(Gpt3Request, {});
