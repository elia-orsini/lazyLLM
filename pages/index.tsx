import Footer from "@components/Footer";
import Image from "next/image";
import Link from "next/link";

const Landing = () => {
  return (
    <>
      <div className="h-screen flex flex-col items-start">
        <div className="fixed bg-white w-full grid grid-cols-2 flex items-center px-8 py-4 border-b border-black z-10">
          <h2 className="font-black text-xl">
            <Image
              src="/lazyLLMlogo.png"
              alt="lazyLLM logo"
              className="w-6 inline mr-1 pb-1.5"
            />
            lazyLLM
          </h2>
          <div className="text-right">
            {/* <h2 className="inline mx-1 px-1 font-semibold hover:bg-gray-200 text-sm cursor-pointer uppercase">about</h2> */}
            <Link href="/datasets">
              <h2 className="inline ml-1 px-1 font-semibold cursor-pointer text-sm hover:bg-gray-200 uppercase">
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
          <Image
            className="w-60 ml-25 hidden sm:block"
            alt="lazyLLm character 2"
            src="lazy2.svg"
          />
          <div className="flex flex-col pt-32 sm:pt-25 cursor-pointer">
            <Link href="/datasets">
              <button className="mx-auto bg-black text-white px-2">
                ENTER
              </button>
            </Link>
            <p className="mt-3 text-center font-bold">
              its Free. And Open Source.
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-screen bg-secondary border-t-2 border-b-2 border-black ">
        <div className="w-full my-auto my-auto">
          <div className="sm:flex sm:w-max mx-auto">
            <Image
              src="lazy3.svg"
              alt="lazyLLm character 3"
              className="w-40 sm:w-52 sm:mr-20 mx-auto pl-10 sm:ml-0 pr-4 sm:pl-0"
            />
            <div className="my-auto text-center sm:text-left">
              <h1 className="font-bold text-2xl sm:text-3xl">
                A self-contained tool.
              </h1>
              <p className="mt-4 font-semibold text-sm  sm:text-base">
                Create and edit prompts. <br />
                Download them. <br />
                Test them. <br />
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
            <Image
              src="lazy4.svg"
              alt="lazyLLm character 4"
              className="w-40 mt-4 sm:mt-0 sm:w-80 mx-auto sm:ml-0"
            />
          </div>
        </div>
      </div>

      <div className="flex bg-white h-screen border-b-2 border-black">
        <div className="mx-auto my-auto grid sm:grid-cols-2 pt-10 sm:py-0 w-3/4">
          <Image
            src="table.svg"
            alt="summary table of features"
            width={400}
            className="col-span-1 mx-auto my-auto"
          />
          <div className="grid grid-rows-2">
            <Image
              src="table2.svg"
              alt="summary table of features 2"
              className="mx-auto my-auto w-60 sm:block hidden"
            />
            <Image
              src="lazy5.svg"
              alt="lazyLLm character 5"
              className="mx-auto my-auto w-44 pt-10 sm:pt-0"
            />
          </div>
        </div>
      </div>

      <div className="flex bg-secondary pb-10 px-10">
        <Footer />
      </div>
    </>
  );
};

export default Landing;
