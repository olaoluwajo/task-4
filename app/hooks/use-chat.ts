/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { Message } from "../lib/types";
import { API } from "../lib/api";

export const useChat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const sendMessage = useCallback(async (text: string) => {
		if (!text.trim()) {
			setError("Please enter a message");
			return;
		}

		const newMessage: Message = {
			id: Date.now(),
			text,
			sender: "user",
			timestamp: new Date().toISOString(),
		};

		setMessages((prev) => [...prev, newMessage]);
		setIsLoading(true);
		setError(null);

		try {
			const language = await API.detectLanguage(text);
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === newMessage.id
						? { ...msg, detectedLanguage: language.languageCode }
						: msg
				)
			);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const translateMessage = useCallback(
		async (messageId: number, targetLang: string) => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === messageId ? { ...msg, isTranslating: true } : msg
				)
			);

			try {
				const message = messages.find((m) => m.id === messageId);
				if (!message) throw new Error("Message not found");

				const result = await API.translateText(message.text, targetLang);
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === messageId
							? {
									...msg,
									isTranslating: false,
									translation: result.translatedText,
							  }
							: msg
					)
				);
			} catch (error: any) {
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
		async (messageId: number) => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === messageId ? { ...msg, isSummarizing: true } : msg
				)
			);

			try {
				const message = messages.find((m) => m.id === messageId);
				if (!message) throw new Error("Message not found");

				const result = await API.summarizeText(message.text);
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === messageId
							? { ...msg, isSummarizing: false, summary: result.summary }
							: msg
					)
				);
			} catch (error: any) {
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
