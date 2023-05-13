import React from "react";
import Title from "@components/Title";
import Footer from "@components/Footer";
import TemplateMode from "@components/PromptsCreator";

const IndexPage = () => {
  return (
    <>
      <div className="mx-auto w-10/12 h-screen">
        <Title />

        <TemplateMode />

        <Footer />
      </div>
    </>
  );
};

export default IndexPage;
