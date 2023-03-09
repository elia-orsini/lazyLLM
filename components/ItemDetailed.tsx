export default function ItemDetailed({ content }) {
  return (
    <div className="text-sm py-2 sm:mt-2 mt-2 mx-auto border border-black rounded px-2 sm:w-80 w-72 hover:bg-gray-100 text-left">
      <p>
        {content.prompt.split("\n").map((line: string) => {
          return <p key={line}>{line}</p>;
        })}
      </p>
    </div>
  );
}
