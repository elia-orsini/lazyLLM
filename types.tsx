export default interface IPrompt {
    id: number;
    paperId: number;
    cognitiveBias: string;
    prompt: string;
    changes: string;
    original: string;
    variants: number;
    metricType: string;
    participants: string;
}