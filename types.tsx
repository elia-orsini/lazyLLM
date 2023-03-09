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
