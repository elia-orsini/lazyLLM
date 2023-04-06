export default function EvalItem({ item }) {
  return (
    <a href={`eval/${item}`}>
      <div className="text-xs font-mono mx-auto rounded px-2 sm:w-80 w-72 hover:bg-gray-100 text-left">
        <p className="py-1 overflow-hidden">{item}</p>
      </div>
    </a>
  );
}
