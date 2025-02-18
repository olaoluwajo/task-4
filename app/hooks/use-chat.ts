/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from "react";
import { Message } from "../lib/types";

declare global {
	interface Window {
		ai: any;
	}
}

export const useChat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const isBrowser = typeof window !== "undefined";

	const isSummarizerSupported =
		isBrowser && "ai" in window && "summarizer" in (window.ai as any);

	const isTranslatorSupported =
		isBrowser && "ai" in window && "translator" in (window.ai as any);

	const isLanguageDetectorSupported =
		isBrowser && "ai" in window && "languageDetector" in (window.ai as any);

	const detectLanguage = async (text: string) => {
		if (!isLanguageDetectorSupported) {
			console.warn("Language Detector API is not supported in this browser.");
			return null;
		}

		try {
			const capabilities = await window.ai.languageDetector.capabilities();
			if (capabilities.available === "no") {
				console.warn("Language Detector API is not available.");
				return null;
			}

			const detector = await window.ai.languageDetector.create();
			const result = await detector.detect(text);
			return result[0];
		} catch (error) {
			console.error("Error during language detection:", error);
			return null;
		}
	};

	const sendMessage = async (text: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const detectionResult = await detectLanguage(text);
			const detectedLanguageCode =
				detectionResult?.detectedLanguage || "Unknown";
			const confidence = detectionResult?.confidence || 0;

			const languageMap: { [key: string]: string } = {
				en: "English",
				es: "Spanish",
				fr: "French",
				pt: "Portuguese",
				ru: "Russian",
				tr: "Turkish",
			};

			const detectedLanguageName =
				languageMap[detectedLanguageCode] || detectedLanguageCode;

			const userMessage: Message = {
				id: Date.now().toString(),
				text,
				sender: "user",
				timestamp: new Date().toISOString(),
				detectedLanguage: `(${(confidence * 100).toFixed(
					1
				)}% confidence) sure that this is ${detectedLanguageName}`,
				isTranslating: text.length <= 150,
				isSummarizing: text.length > 150,
			};
			setMessages((prev) => [...prev, userMessage]);

			if (text.length > 150) {
				await summarizeMessage(userMessage.id);
			} else {
				await translateMessage(userMessage.id, "es"); // Default to Spanish
			}
		} catch (error: any) {
			console.error("Error during summarization or translation:", error);
			setError(error.message || "Failed to process message");
		} finally {
			setIsLoading(false);
		}
	};

	const translateMessage = useCallback(
		async (messageId: string, targetLang: string, textToTranslate?: string) => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === messageId ? { ...msg, isTranslating: true } : msg
				)
			);

			try {
				const message = messages.find((m) => m.id === messageId);
				if (!message) return;

				const text = textToTranslate || message.text;

				if (isTranslatorSupported) {
					const capabilities = await window.ai.translator.capabilities();
					const languagePairStatus = capabilities.languagePairAvailable(
						"en",
						targetLang
					);

					if (languagePairStatus === "no") {
						console.warn(
							`Translation from English to ${targetLang} is not supported.`
						);
						setError(`Translation to ${targetLang} is not supported.`);
						return;
					}

					const translator = await window.ai.translator.create({
						sourceLanguage: "en",
						targetLanguage: targetLang,
					});

					const translatedText = await translator.translate(text);
					// console.log("Translated Text:", translatedText);

					setMessages((prev) =>
						prev.map((msg) =>
							msg.id === messageId
								? {
										...msg,
										isTranslating: false,
										translation: textToTranslate
											? msg.translation
											: translatedText,
										translatedSummary: textToTranslate
											? translatedText
											: msg.translatedSummary,
								  }
								: msg
						)
					);
				} else {
					console.warn("Translator API is not supported in this browser.");
					setError("Translator is not supported in your browser.");
				}
			} catch (error: any) {
				console.error("Error during translation:", error);
				setError(error.message);
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === messageId
							? { ...msg, isTranslating: false, error: error.message }
							: msg
					)
				);
			}
		},
		[messages]
	);

	const summarizeMessage = useCallback(
		async (messageId: string) => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === messageId ? { ...msg, isSummarizing: true } : msg
				)
			);

			try {
				const message = messages.find((m) => m.id === messageId);
				if (!message) return;

				if (isSummarizerSupported) {
					const summarizer = await window.ai.summarizer.create({
						type: "headline",
						format: "plain-text",
						length: "short",
					});

					const summary = await summarizer.summarize(message.text);
					// console.log("Summary:", summary);

					setMessages((prev) =>
						prev.map((msg) =>
							msg.id === messageId
								? { ...msg, isSummarizing: false, summary: summary }
								: msg
						)
					);
				} else {
					console.warn("Summarizer API is not supported in this browser.");
					setError("Summarizer is not supported in your browser.");
				}
			} catch (error: any) {
				console.error("Error during summarization:", error);
				setError(error.message);
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === messageId
							? { ...msg, isSummarizing: false, error: error.message }
							: msg
					)
				);
			}
		},
		[messages]
	);

	return {
		messages,
		isLoading,
		error,
		sendMessage,
		translateMessage,
		summarizeMessage,
	};
};
