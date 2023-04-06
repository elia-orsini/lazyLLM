import { EvalSample } from "types";

export default function PromptVisualiser({
  evalSample,
}: {
  evalSample: EvalSample;
}) {
  return (
    <div className="border rounded-lg border-black px-2 w-full max-h-40 overflow-scroll pb-2">
      {evalSample.input.map((item, index) => (
        <div className={`py-1`} key={index}>
          <span className="font-normal font-semibold">{`${item.role}: `}</span>
          <span className="font-normal">{item.content}</span>
        </div>
      ))}
    </div>
  );
}
