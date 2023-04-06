export default function PromptPreview({
  title,
  link,
  bgImage,
  title2 = "",
  title3 = "",
}) {
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
              <svg width="100%" height="100%">
                <text
                  x="50%"
                  y="50%"
                  dominant-baseline="middle"
                  text-anchor="middle"
                  font-size="40px"
                  stroke="black"
                  stroke-width="1px"
                  fill="white"
                  font-family="sans-serif"
                  font-weight="bold"
                  stroke-linejoin="round"
                >
                  <tspan x="50%" dy="-1.2em">
                    {title}
                  </tspan>
                  <tspan x="50%" dy="1.2em">
                    {title2 && title2}
                  </tspan>
                  <tspan x="50%" dy="1.2em">
                    {title3 && title3}
                  </tspan>
                </text>
              </svg>
            </div>
            <div
              className="absolute inset-0 z-0 transition duration-300 ease-in-out transform scale-100 hover:scale-105"
              style={{
                backgroundImage: `url('${bgImage}')`,
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </div>
      </div>
    </a>
  );
}
