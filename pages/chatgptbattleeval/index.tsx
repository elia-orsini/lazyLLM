import React, { useEffect, useState } from "react";
import axios from "axios";
import downloadJSON from "@utils/downloadJSON";
import {
  IPrompt,
  IMessage,
  EvalSample,
  ChatMessage,
  EvalYAMLFile,
} from "types";
import { Oval } from "react-loading-icons";
import Title from "@components/Title";
import YAML from "js-yaml";
import { useRouter } from "next/router";
import PromptVisualiser from "@components/PromptVisualiser";
import Cookies from "js-cookie";
import PopUpForm from "@components/PopUpForm";

const Gpt3Request = () => {
  const [prompt, setPrompt] = useState<ChatMessage>();
  const [ideal, setIdeal] = useState<Number | string>();
  const [responses, setResponses] = useState<Array<IMessage>>([]);

  const [numberOfTimes, setNumberOfTimes] = useState<number>(1);

  const [maxTokens, setMaxTokens] = useState<number>(50);
  const [temperature, setTemperature] = useState<number>(1);
  const [topP, setTopP] = useState<number>(0.1);

  const [prompts, setPrompts] = useState<ChatMessage[]>([]);
  const [ideals, setIdeals] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [experimentMetadata, setExperimentMetadata] = useState<EvalSample[]>();

  const [time, setTime] = useState<Date>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [qaValues, setQaValues] = useState<string[]>([]);

  const [evalDataPath, setEvalDataPath] = useState<any>(null);
  const [evalsDesc, setEvalsDesc] = useState<any>(null);

  const router = useRouter();
  const id = router.query.id as string;

  const privateKey = Cookies.get("privateKey");

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
          const data = lines.map((line) => JSON.parse(line));

          const evalsInputs = data.map((obj) => obj.input);
          const evalsIdeals = data.map((obj) => obj.ideal);

          setPrompts(evalsInputs);
          setIdeals(evalsIdeals);
          setPrompt(evalsInputs[0]);
        })
        .catch((error) => console.error("Error reading YAML file:", error));
  }, [evalDataPath]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const jsonData = JSON.parse(event.target?.result as string);

        const evalsInputs = jsonData.map((obj) => obj.input);
        const evalsIdeals = jsonData.map((obj) => obj.ideal);

        setPrompts(evalsInputs);
        setIdeals(evalsIdeals);
        setPrompt(evalsInputs[0]);
      };

      reader.readAsText(file as Blob);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const API_KEY = privateKey;
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const responsesArray = [];

    const initialMessages = prompt;

    setLoading(true);
    setQaValues([]);

    await axios
      .post(
        API_URL,
        {
          model: "gpt-3.5-turbo-0301",
          messages: initialMessages,
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
      )
      .then((response) => {
        setLoading(false);
        setError("");

        const date = new Date(response.data.created * 1000);
        setTime(date);

        response.data.choices.map((choice) =>
          responsesArray.push({
            text: choice.message.content,
            edited: choice.message.content,
            index: choice.index,
            finishReason: choice.finish_reason,
          })
        );
      })
      .catch((response) => {
        setError(response.response.data.error.message);
      });

    setResponses(responsesArray);
  };

  const qaNumber = async (type = "number") => {
    const promises = responses.map((r) => {
      const qaPrompt = [prompt[0]];

      const formattedResponse = { role: "system", content: r.text };
      qaPrompt.push(formattedResponse);

      const parseNumber =
        "Convert your previous answer to a number with no other text (without quotes or punctuation). return only numbers.";
      const parseText =
        "Answer the question by printing only the correct answer (without quotes or punctuation) with no other text.";

      // github.com/openai/evals/blob/main/evals/elsuite/modelgraded/classify.py
      const magicQaPrompt = {
        role: "user",
        content: type === "number" ? parseNumber : parseText,
      };

      qaPrompt.push(magicQaPrompt);

      const API_KEY = privateKey;
      const API_URL = "https://api.openai.com/v1/chat/completions";

      return axios
        .post(
          API_URL,
          {
            model: "gpt-3.5-turbo-0301",
            messages: qaPrompt,
            max_tokens: maxTokens,
            n: numberOfTimes,
            temperature: 0,
            top_p: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        )
        .then((response) => {
          return response.data.choices[0].message.content;
        });
    });

    Promise.all(promises).then((answers) => {
      setQaValues(answers);
    });
  };

  const customEdit = (
    event: React.FormEvent<HTMLFormElement>,
    item: IMessage
  ): void => {
    event.preventDefault();

    // @ts-ignore
    const submitter = event.nativeEvent.submitter.name;

    let newValue: string;

    if (submitter === "edit") {
      newValue = event.target[0].value;
    } else {
      newValue = "null";
    }

    event.target[0].value = "";
    event.target[3].className = "ml-2 opacity-100";
    setTimeout(() => {
      event.target[3].className = "ml-2 opacity-0";
    }, 2000);

    responses[item.index].edited = newValue;
  };

  const triggerDownloadJSON = () => {
    const jsonFile = {
      prompt: prompt,
      maxTokens: maxTokens,
      temperature: temperature,
      topP: topP,
      ideal: ideal,
      responses: responses,
    };

    downloadJSON(jsonFile, `evalOpenAIResults`);
  };

  return (
    <div className="mx-auto h-screen w-10/12">
      <Title includeDefaultLinks={true} />

      {!privateKey && <PopUpForm />}

      <form className="w-full bg-gray-200 rounded-xl" onSubmit={handleSubmit}>
        <div className="grid items-center px-3 rounded-xl py-3 mt-5 border border-black">
          <div className="flex">
            <input
              id="files"
              type="file"
              accept=".json"
              onChange={handleFileUpload}
            />

            <button
              type="button"
              className="px-2 border border-black hover:bg-gray-200"
              onClick={() => {
                currentIndex > 0 && setCurrentIndex(currentIndex - 1);
                currentIndex > 0 && setPrompt(prompts[currentIndex - 1]);
                currentIndex > 0 && setIdeal(ideals[currentIndex - 1]);
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
                currentIndex < prompts.length - 1 &&
                  setCurrentIndex(currentIndex + 1);
                currentIndex < prompts.length - 1 &&
                  setPrompt(prompts[currentIndex + 1]);
                currentIndex < prompts.length - 1 &&
                  setIdeal(ideals[currentIndex + 1]);
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
              current index: {currentIndex} /{" "}
              {prompts.length > 0 ? prompts.length - 1 : 0}
            </p>

            <button
              type="button"
              className={`border border-black px-2 ml-10 ${
                responses.length === 0 && "opacity-50 pointer-events-none"
              }`}
              onClick={() => {
                qaNumber();
              }}
            >
              QA NUMBER
            </button>

            <button
              type="button"
              className={`border border-black px-2 ml-10 ${
                responses.length === 0 && "opacity-50 pointer-events-none"
              }`}
              onClick={() => {
                qaNumber("text");
              }}
            >
              QA TEXT
            </button>
          </div>

          <div className="flex mt-4">
            {prompt && (
              <>
                <PromptVisualiser
                  evalSample={{ input: prompt, ideal: "" } as any}
                />
                {loading ? (
                  <button className="inline-flex my-auto justify-center px-2 text-blue-600 rounded-lg cursor-pointer">
                    <Oval width="24" strokeWidth={4} stroke="currentColor" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex my-auto justify-center px-2 text-blue-600 rounded-lg cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="black"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>

          <div className="flex gap-5">
            <div className="flex mt-3  w-max rounded-lg">
              <button
                type="button"
                className={`border mx-auto my-auto border-black uppercase px-3 bg-white hover:bg-black hover:text-white ${
                  responses.length === 0 && "opacity-50 pointer-events-none"
                }`}
                onClick={() => triggerDownloadJSON()}
              >
                download json
              </button>
            </div>

            <div className="flex flex-col mt-3 border-black border w-max rounded-lg bg-white">
              <p className="bg-gray-50 w-full rounded-t-lg px-2 border-b border-black text-sm font-semibold">
                SETTINGS
              </p>

              <div className="flex flex-cols-2 gap-6 px-4 py-3">
                <div>
                  <p className="my-auto text-sm uppercase text-center">
                    repetitions{" "}
                  </p>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={numberOfTimes}
                    onChange={(event) =>
                      setNumberOfTimes(parseInt(event.target.value))
                    }
                    className="block w-16 mx-auto mt-1 py-1 pl-2 text-sm text-gray-900 bg-white rounded-lg border border-black"
                    placeholder="1"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col mt-3 border-black border w-max rounded-lg text-sm bg-white">
              <p className="bg-gray-50 w-full rounded-t-lg px-2 border-b border-black font-semibold">
                PARAMETERS
              </p>

              <div className="flex flex-cols-3 gap-6 px-4 pt-3">
                <div>
                  <p className=" my-auto uppercase text-center">max tokens </p>
                  <input
                    type="number"
                    min="1"
                    value={maxTokens}
                    onChange={(event) =>
                      setMaxTokens(parseInt(event.target.value))
                    }
                    className="block w-16 mx-auto mt-1 py-1 pl-2 text-gray-900 bg-white rounded-lg border border-black"
                    placeholder="7"
                  />
                </div>

                <div>
                  <p className=" my-auto uppercase text-center">temperature </p>
                  <input
                    type="number"
                    step="0.1"
                    max="2"
                    min="0"
                    value={temperature}
                    onChange={(event) =>
                      setTemperature(parseFloat(event.target.value))
                    }
                    className="block w-16 mx-auto mt-1 py-1 pl-2 text-gray-900 bg-white rounded-lg border border-black"
                    placeholder="7"
                  />
                </div>

                <div>
                  <p className=" my-auto uppercase text-center">top P </p>
                  <input
                    type="number"
                    step="0.1"
                    max="1"
                    min="0"
                    value={topP}
                    onChange={(event) =>
                      setTopP(parseFloat(event.target.value))
                    }
                    className="block w-16 mx-auto mt-1 py-1 pl-2 text-gray-900 bg-white rounded-lg border border-black"
                    placeholder="7"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

      {error && (
        <h4 className="font-semibold text-red-500 w-full mt-2">{error}</h4>
      )}

      <h3 className="font-semibold text-lg mt-4">
        RESULTS
        <span className="text-sm">
          {time
            ? ` (${time.getHours()}:${time.getMinutes()}:${time.getSeconds()})`
            : ""}
        </span>
      </h3>
      {responses.length > 0 ? (
        <div className="border-t border-l border-r mt-1 border-black rounded">
          {responses.map((item, i) => (
            <div
              key={item.index}
              className="py-2 px-2 border-b border-black flex flex-col"
            >
              <p>{item.text}</p>

              <form
                className="mt-2 mr-40"
                onSubmit={(event) => customEdit(event, item)}
              >
                <label className="mr-2 my-auto text-sm uppercase">
                  edit answer:
                </label>
                <input
                  type="text"
                  defaultValue={qaValues[i]}
                  className="px-4 border border-black"
                />
                <button
                  type="submit"
                  name="edit"
                  className="px-2 border-t border-r border-b border-black hover:bg-gray-200"
                >
                  edit
                </button>
                <button
                  type="submit"
                  name="setNull"
                  className="px-2 border-t border-r border-b border-black hover:bg-gray-200"
                >
                  set null
                </button>
                <button className="ml-2 opacity-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-40 flex">
          <p className="mx-auto my-auto"> no results </p>
        </div>
      )}

      <div className="mt-40">
        <h3 className="font-semibold text-lg text-center text-white">.</h3>
      </div>
    </div>
  );
};

export default Gpt3Request;
