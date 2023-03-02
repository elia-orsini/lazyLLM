export default function ItemDetailed({ content }) {
  console.log(content.prompt.split("\n"));

  return (
    <div className="text-sm sm:mt-2 mt-2 mx-auto border border-black font-semibold rounded px-2 sm:w-80 w-72 hover:bg-gray-100 text-left">
      <p>
        {content.prompt.split("\n").map((line: string) => {
          return <p>{line}</p>;
        })}
      </p>
    </div>
  );
}
