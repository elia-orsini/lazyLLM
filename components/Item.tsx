import { IPrompt } from "types";

export default function Item({ content, fullData }) {
  const filteredItems = fullData.filter((item: IPrompt) => {
    return item.id === content.id;
  });

  const allVariantsTested = filteredItems.every((item: IPrompt) => item.tested);
  const discussionPresent = filteredItems.every(
    (item: IPrompt) => item.discussion !== ""
  );

  return (
    <a href={`cbprompts/${content.id}`}>
      <div className="text-xs h-full mx-auto border border-black rounded px-2 hover:bg-gray-100 text-left">
        <p className="py-1 overflow-hidden h-max">
          {content.prompt.slice(0, 190)}...
        </p>

        <hr className="border-black my-0" />

        <div className="py-1 font-normal">
          <span className="tracking-wide uppercase">
            {content.cognitiveBias}
          </span>

          <span className="uppercase"> - {content.variants} versions </span>
        </div>
      </div>
    </a>
  );
}
