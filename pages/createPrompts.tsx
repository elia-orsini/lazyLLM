import React, { useState } from "react";
import Title from "@components/Title";
import Footer from "@components/Footer";
import TemplateMode from "@components/TemplateModePrompts";
import FreeMode from "@components/FreeModePrompts";

const IndexPage = () => {
  const [templateMode, setTemplateMode] = useState(true);

  return (
    <>
      <div className="mx-auto w-10/12 h-screen">
        <Title />

        <div className="flex w-full">
          <div className="mx-auto mt-8">
            <button
              className={`px-2 border border-black ${
                templateMode && "bg-black text-white"
              }`}
              onClick={() => {
                setTemplateMode(true);
              }}
            >
              TEMPLATE
            </button>

            <button
              className={`px-2 border-t border-b border-r border-black ${
                !templateMode && "bg-black text-white"
              }`}
              onClick={() => {
                setTemplateMode(false);
              }}
            >
              FREE
            </button>
          </div>
        </div>

        {templateMode ? <TemplateMode /> : <FreeMode />}

        <Footer />
      </div>
    </>
  );
};

export default IndexPage;
