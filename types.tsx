export interface IPrompt {
  id: number;
  paperId: number;
  cognitiveBias: string;
  prompt: string;
  changes: string;
  original: string;
  variants: number;
  metricType: string;
  participants: string;
  resultFormatLength: number;
  tested: boolean;
  discussion: string;
}

export interface ChatMessage {
  role: string;
  content: string;
}

export interface IMessage {
  text: string;
  edited: string;
  index: number;
  finishReason: string;
}

export interface EvalSample {
  input: [ChatMessage];
  ideal: string;
}

export type EvalYAMLFile = {
  (key: string): {
    id: string;
    description: string;
    metrics: [string];
  };
  (key: string): {
    class: string;
    args: {
      samples_jsonl: string;
    };
  };
};
