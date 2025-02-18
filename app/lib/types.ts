export interface Message {
	id: string;
	text: string;
	sender: string;
	timestamp: number | string;
	detectedLanguage?: string;
	translation?: string;
	summary?: string;
	isTranslating?: boolean;
	isSummarizing?: boolean;
	error?: string;
	translatedSummary?: string;
}
export interface Language {
	code: string;
	name: string;
}
