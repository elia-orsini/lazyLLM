import ReactMarkdown from "react-markdown";
import "github-markdown-css";

export default function MarkDownRenderer({ text }) {
  return (
    <div className="markdown-body max-w-4xl">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}
