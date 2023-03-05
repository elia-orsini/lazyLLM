import { IPrompt } from "types";

export default function Item({ content, fullData }) {
  const itemsWithSameId = fullData.filter((item: IPrompt) => {
    return item.id === content.id;
  });

  return (
    <a href={`prompts/${content.id}`}>
      <div className="text-sm sm:mt-2 mt-2 mx-auto border border-black font-semibold rounded px-2 sm:w-80 w-72 hover:bg-gray-100 text-left">
        <p>{content.prompt.slice(0, 150)}...</p>

        <hr className="border-black my-0" />

        <span className="font-normal tracking-wide text-sm uppercase">{content.cognitiveBias}</span>

        {itemsWithSameId.length === content.variants ? (
          <span className="text-green-600 uppercase"> - {content.variants} versions </span>
        ) : (
          <span className="text-red-600 uppercase"> - {content.variants} versions </span>
        )}
      </div>
    </a>
  );
}
