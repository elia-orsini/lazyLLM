export default function TextWithBreak({ text }) {
  return (
    <p>
      {text.split("\n").map((line: string) => {
        return <p key={line}>{line}</p>;
      })}
    </p>
  );
}
