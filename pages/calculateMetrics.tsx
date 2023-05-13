import React, { useEffect, useState } from "react";
import Title from "@components/Title";
import Footer from "@components/Footer";
import functions from "@utils/stats";

const IndexPage = () => {
  const [responses, setResponses] = useState<string[]>([]);
  const [result, setResult] = useState<any>();
  const [resultFormatLength, setResultFormatLength] = useState<number>(0);
  const [ideal, setIdeal] = useState<any>();
  const [numerical, setNumerical] = useState<boolean>(true);
  const [results, setResults] = useState<any>([]);

  const [error, setError] = useState<string>("");

  const [first, setFirst] = useState<any>([]);
  const [second, setSecond] = useState<any>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        const jsonData = JSON.parse(event.target?.result as string);

        setResponses(jsonData.responses);

        if (jsonData.resultFormatLength) {
          setResultFormatLength(jsonData.resultFormatLength);
        }
        if (!jsonData.resultFormatLength && numerical) {
          setResultFormatLength(1);
        }

        setIdeal(jsonData.ideal);
      };

      reader.readAsText(file as Blob);
    } catch (error) {
      setError(error.message);
    }
  };

  function formatNumericValues(responses, n = 1) {
    let results = [];
    let valid = 0;
    let invalid = 0;
    let total = 0;
    let invalid_responses = [];

    try {
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
    } catch (error) {
      setError(error.message);
    }

    return { results, valid, invalid, total, invalid_responses };
  }

  function formatTextualValues(responses) {
    const results = [];

    for (let i = 0; i < responses.length; i++) {
      let cleaned = responses[i]["edited"].replace(/\n/g, "");
      cleaned = cleaned.replace(/,/g, "");

      results.push(cleaned);
    }

    return { results };
  }

  function get_n_value(results, n) {
    return results.map((i) => i[n]);
  }

  useEffect(() => {
    if (numerical) {
      const { results } = formatNumericValues(responses, resultFormatLength);
      setResults(results);
      setFirst(get_n_value(results, 0));
      setSecond(get_n_value(results, 1));
    } else {
      const { results } = formatTextualValues(responses);
      setResults(results);
      setFirst(results.map((i) => i));
    }
  }, [responses, numerical, resultFormatLength]);

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

        <div className="flex w-full grid grid-col col-1 bg-blac">
          <div className="mx-auto">
            <p className="uppercase text-xs mt-8">
              <span className="">import dataset</span>
            </p>
            <input
              className="mx-auto mt-1 border p-2 border-black bg-secondary"
              id="files"
              type="file"
              accept=".json"
              onChange={handleFileUpload}
            />

            <p className="font-bold text-sm text-red-700">{error}</p>
          </div>

          <div className="mx-auto mt-10">
            <span className="mr-2">prompt format is</span>
            <button
              className="border border-black px-2 hover:bg-secondary"
              onClick={() => setNumerical(!numerical)}
            >
              {numerical ? "numerical" : "textual"}
            </button>
          </div>

          {resultFormatLength === 1 && numerical && (
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

          {resultFormatLength === 2 && numerical && (
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

          {first.length > 0 && (
            <div className="mt-10 mx-auto">
              <span className="">best match:</span>
              <input
                className="border border-black ml-2 w-40 px-1"
                value={ideal}
                onChange={(e) => setIdeal(e.target.value)}
              />
              <button
                className="px-2 border border-black bg-black text-white"
                onClick={() => {
                  setResult(
                    `${calculateBestMatch(first, ideal)} / ${first.length} - (${
                      (calculateBestMatch(first, ideal) / first.length) * 100
                    }% accuracy)`
                  );
                }}
              >
                analyse
              </button>
            </div>
          )}

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
      </div>
    </>
  );
};

export default IndexPage;
