import Footer from "@components/Footer";
import Link from "next/link";

const Landing = () => {
  return (
    <>
      <div className="h-screen flex flex-col items-start">
        <div className="fixed bg-white w-full grid grid-cols-2 flex items-center px-8 py-4 border-b border-black z-10">
          <h2 className="font-black text-xl">
            <img src="/lazyLLMlogo.png" className="w-6 inline mr-1 pb-1.5" />
            lazyLLM
          </h2>
          <div className="text-right">
            <h2 className="inline font-semibold">about</h2>
            <Link href="/datasets">
              <h2 className="inline pl-4 font-semibold cursor-pointer">
                enter
              </h2>
            </Link>
          </div>
        </div>

        <div className="mx-auto pt-32 sm:my-auto px-10">
          <h1 className="font-bold text-3xl sm:text-5xl">
            An NLP Toolkit that is simple. <br />
            And powerful.
          </h1>
          <p className="text-center mt-8 text-base font-semibold">
            lazyLLM gives you everything you need to create, edit and test
            prompts.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 w-full">
          <img className="w-60 ml-25 hidden sm:block" src="lazy2.svg" />
          <div className="flex flex-col pt-32 sm:pt-25">
            <Link href="/datasets">
              <button className="mx-auto bg-black text-white px-2 cursor-pointer">
                ENTER
              </button>
            </Link>
            <p className="mt-3 text-center font-bold">
              its Free. And Open Source.
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-screen bg-gray-300">
        <div className="w-full my-auto my-auto">
          <div className="sm:flex sm:w-max mx-auto">
            <img
              src="lazy3.png"
              className="w-40 sm:w-80 mx-auto pl-10 sm:ml-0 pl-0"
            />
            <div className="my-auto text-center sm:text-left">
              <h1 className="font-bold text-2xl sm:text-3xl">
                A self-contained tool.
              </h1>
              <p className="mt-4 font-semibold text-sm  sm:text-base">
                Create and edit prompts. <br />
                Organise or edit them. <br />
                Download them in any format. <br />
                Test them on any LLM. <br />
                <br />
                All in one place.
              </p>
            </div>
          </div>
          <div className="sm:flex sm:w-max mx-auto sm:mt-0 mt-10">
            <div className="my-auto text-center sm:text-left">
              <p className="font-bold text-2xl sm:text-3xl px-10 sm:px-0">
                No coding tool for everyone.
              </p>
              <p className="mt-4 font-semibold text-sm sm:text-base">
                Quickly test hypothesis. <br />
                Break LLMs. Fast. <br />
                Re-use prompts.
              </p>
            </div>
            <img
              src="lazy4.png"
              className="w-40 mt-4 sm:mt-0 sm:w-80 mx-auto sm:ml-0"
            />
          </div>
        </div>
      </div>

      <div className="flex bg-white h-screen">
        <div className="mx-auto my-auto grid grid-cols-2 w-3/4">
          <img
            src="table.svg"
            width={400}
            className="col-span-1 mx-auto my-auto"
          />
          <div className="grid grid-rows-2">
            <img src="table2.svg" className="mx-auto my-auto w-60" />
            <img src="table3.svg" className="mx-auto my-auto w-60" />
          </div>
        </div>
      </div>

      <div className="flex bg-gray-300 pb-10 px-10">
        <Footer />
      </div>
    </>
  );
};

export default Landing;
