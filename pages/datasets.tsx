import React from "react";
import Title from "@components/Title";
import PromptPreview from "@components/PromptPreview";
import Footer from "@components/Footer";
import Link from "next/link";

const IndexPage = () => {
  return (
    <>
      <div className="mx-auto w-10/12 h-screen">
        <Title />

        <div className="w-full mt-2">
          <p className="text-center font-semibold text-lg mt-5">
            explore the existing datasets, or{" "}
            <Link href={"/createPrompts"}>
              <span className="underline cursor-pointer">
                create your own prompts
              </span>
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-5/6">
          <PromptPreview
            title="OPENAI EVALS"
            link={"/evalslist"}
            bgImage1="/dalle8.png"
            bgImage2="/dalle8.png"
          />
          <PromptPreview
            title="COGNITIVE BIASES PROMPTS"
            link={"/cbprompts"}
            bgImage1="/dalle9.png"
            bgImage2="/dalle9.png"
          />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default IndexPage;
