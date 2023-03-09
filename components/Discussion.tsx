import TextWithBreak from "./TextWithBreak";

export default function Discussion({ text, showDiscussion }) {
  return (
    <div className="absolute w-full top-0 left-0 flex h-screen">
      <div className="my-auto mx-auto max-w-4xl bg-white z-10 rounded-lg border border-black shadow-lg">
        <div className="text-right pr-4 pt-2 bg-gray-100 rounded-t-lg flex justify-between border-b border-black">
          <div className="text-left flex pb-2 px-4 font-mono text-sm">discussion</div>
          <button className="pb-2" onClick={() => showDiscussion(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-4 text-sm text-left">
          <TextWithBreak text={text} />
        </div>
      </div>

      <div className="w-full h-full absolute bg-white z-0 opacity-70"></div>
    </div>
  );
}
