import IPrompt from "types";

export default function extractData(item):IPrompt {
  const data = item.properties;

  return {
    id: data.ID.number,
    paperId: data.PAPER_ID.number,
    cognitiveBias: data.COGNITIVE_BIAS.rich_text[0]?.plain_text || "",
    prompt: data.PROMPT.rich_text[0]?.plain_text || "",
    changes: data.CHANGES.rich_text[0]?.plain_text || "",
    original: data.ORIGINAL.rich_text[0]?.plain_text || "",
    variants: data.VARIANTS?.number || 0,
    metricType: data.METRIC_TYPE.rich_text[0]?.plain_text || "",
    participants: data.PARTICIPANTS.rich_text[0]?.plain_text || "",
  };
}
