export interface Message {
	id: number;
	text: string;
	sender: "user" | "assistant";
	timestamp: string;
	detectedLanguage?: string;
	translation?: string;
	summary?: string;
	isTranslating?: boolean;
	isSummarizing?: boolean;
	error?: string;
}

export interface Language {
	code: string;
	name: string;
}


