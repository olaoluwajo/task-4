/* eslint-disable @typescript-eslint/no-explicit-any */
import { Language } from "./types";

export const languages: Language[] = [
	{ code: "en", name: "English" },
	{ code: "es", name: "Spanish" },
	{ code: "fr", name: "French" },
	{ code: "pt", name: "Portuguese" },
	{ code: "ru", name: "Russian" },
	{ code: "tr", name: "Turkish" },
];


declare const chrome: any;

export const API = {
	async detectLanguage(text: string) {
		try {
			const language = await chrome.languageDetection.detectLanguage(text);
			return language;
		} catch (error: any) {
			throw new Error("Language detection failed: " + error.message);
		}
	},

	async translateText(text: string, targetLanguage: string) {
		try {
			const result = await chrome.translator.translate(text, targetLanguage);
			return result;
		} catch (error: any) {
			throw new Error("Translation failed: " + error.message);
		}
	},

	async summarizeText(text: string) {
		try {
			const summary = await chrome.summarizer.summarize(text);
			return summary;
		} catch (error: any) {
			throw new Error("Summarization failed: " + error.message);
		}
	},
};