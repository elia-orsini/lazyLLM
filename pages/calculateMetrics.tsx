import React, { useState } from "react";
import Title from "@components/Title";
import Footer from "@components/Footer";
import functions from "@utils/stats";

const IndexPage = () => {
  const [responses, setResponses] = useState<string[]>([]);
  const [result, setResult] = useState<any>();
  const [resultFormatLength, setResultFormatLength] = useState<number>(0);
  const [ideal, setIdeal] = useState<any>();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const jsonData = JSON.parse(event.target?.result as string);

      setResponses(jsonData.responses);
      setResultFormatLength(jsonData.resultFormatLength);
    };

    reader.readAsText(file as Blob);
  };

  function format_n_values_data(responses, n = 1) {
    let results = [];
    let valid = 0;
    let invalid = 0;
    let total = 0;
    let invalid_responses = [];

    for (let i = 0; i < responses.length; i++) {
      try {
        let cleaned = responses[i]["edited"].replace(/\n/g, "");
        cleaned = cleaned.replace(/,/g, "");

        let formatted = cleaned.split(" ").map(parseFloat);

        if (formatted.length === n && formatted != "NaN") {
          results.push(formatted);
          valid++;
        } else {
          invalid_responses.push(responses[i]["edited"]);
          invalid++;
        }
      } catch (error) {
        invalid++;
        invalid_responses.push(responses[i]["edited"]);
      }
      total++;
    }

    return { results, valid, invalid, total, invalid_responses };
  }

  function get_n_value(results, n) {
    return results.map((i) => i[n]);
  }

  const { results } = format_n_values_data(responses, resultFormatLength);
  const first = get_n_value(results, 0);
  const second = get_n_value(results, 1);

  const {
    calculateIndTTest,
    calculateMedian,
    calculateMean,
    calculateStd,
    calculateChiSquare,
    calculateCohensD,
    calculateOneWayAnova,
    calculateBestMatch,
  } = functions;

  return (
    <>
      <div className="mx-auto w-10/12 h-screen">
        <Title />

        <div className="flex w-full grid grid-col col-1 h-4/6">
          <div className="mx-auto">
            <input
              className="mx-auto mt-8 border p-2 border-black bg-secondary"
              id="files"
              type="file"
              accept=".json"
              onChange={handleFileUpload}
            />
          </div>

          {resultFormatLength === 1 && (
            <div className="mt-10 mx-auto">
              <button
                className="px-2 mx-2 border border-black hover:bg-secondary"
                onClick={() => setResult(calculateMean(first))}
              >
                mean
              </button>
              <button
                className="px-2 mx-2 border border-black hover:bg-secondary"
                onClick={() => setResult(calculateStd(first))}
              >
                std dev
              </button>
              <button
                className="px-2 mx-2 border border-black hover:bg-secondary"
                onClick={() => setResult(calculateMedian(first))}
              >
                median
              </button>
            </div>
          )}

          {resultFormatLength === 2 && (
            <div className="mt-10 mx-auto">
              <button
                className="px-2 mx-2 border border-black hover:bg-secondary"
                onClick={() => setResult(calculateIndTTest(first, second))}
              >
                t test
              </button>
              <button
                className="px-2 mx-2 border border-black hover:bg-secondary"
                onClick={() => setResult(calculateCohensD(first, second))}
              >
                cohen&apos;s d
              </button>
              <button
                className="px-2 mx-2 border border-black hover:bg-secondary"
                onClick={() => setResult(calculateOneWayAnova([first, second]))}
              >
                one way anova
              </button>
            </div>
          )}

          <div className="mt-10 mx-auto">
            <span className="">best match:</span>
            <input
              className="border border-black ml-2 w-40 px-1"
              onChange={(e) => setIdeal(e.target.value)}
            />
            <button
              className="px-2 border border-black bg-black text-white"
              onClick={() => {
                setResult(calculateBestMatch(first, ideal));
              }}
            >
              analyse
            </button>
          </div>

          {result != null && (
            <>
              <div className="mt-10 mx-auto">
                <p className="mx-auto uppercase text-sm font-bold">result</p>
                <div className="bg-secondary border-2 border-black text-center p-2">
                  {result}
                </div>
              </div>
            </>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default IndexPage;
