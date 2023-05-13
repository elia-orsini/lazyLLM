import { useState } from "react";

export default function PromptPreview({ title, link, bgImage1, bgImage2 }) {
  const [bgImage, setBgImage] = useState(bgImage1);

  return (
    <a href={link}>
      <div className="flex h-full">
        <div className="flex w-full h-full mx-auto">
          <div className="relative w-full h-full mt-5 border border-black rounded overflow-hidden">
            <div
              className="absolute my-auto inset-0 z-10"
              style={{
                pointerEvents: "none",
              }}
            >
              <div className="flex h-full w-full">
                <p
                  className="mx-auto my-auto font-bold text-white text-5xl text-center"
                  style={{
                    textShadow:
                      "-0.7px -0.7px 0 #000, 0.7px -0.7px 0 #000, -0.7px 0.7px 0 #000, 0.7px 0.7px 0 #000",
                  }}
                >
                  {title}
                </p>
              </div>
            </div>
            <div
              className="absolute inset-0 z-0 transition-all duration-500 ease-in-out transform scale-100 hover:scale-105"
              style={{
                backgroundImage: `url('${bgImage}')`,
                backgroundSize: "cover",
              }}
              onMouseEnter={() => setBgImage(bgImage2)}
              onMouseOut={() => setBgImage(bgImage1)}
            ></div>
          </div>
        </div>
      </div>
    </a>
  );
}
