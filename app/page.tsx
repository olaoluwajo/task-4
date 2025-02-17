"use client";

import React, { useState, useEffect, useRef } from "react";
import { useChat } from "./hooks/use-chat";
import { ThemeToggle } from "./components/ui/theme-toggle";
import { Message } from "./components/chat/chat-container";
import { MessageInput } from "./components/chat/message-input";

export default function App() {
	const [inputValue, setInputValue] = useState("");
	const {
		messages,
		isLoading,
		error,
		sendMessage,
		translateMessage,
		summarizeMessage,
	} = useChat();

	const messagesEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = async () => {
		if (inputValue.trim()) {
			await sendMessage(inputValue);
			setInputValue("");
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ">
			<div className="max-w-6xl mx-auto p-4 pt-16">
				<ThemeToggle />
				<header className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-20 mb-8 p-4 text-center">
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
						Simple Translator App
					</h1>
					<p className="text-gray-600 dark:text-gray-300">
						Send messages, get translations, and summaries in multiple languages
					</p>
				</header>
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 overflow-y-auto flex-1">
					{messages.length === 0 ? (
						<div className="h-full flex items-center justify-center">
							<p className="text-gray-500 dark:text-gray-400 text-center">
								Start a conversation by sending a message
							</p>
						</div>
					) : (
						<div className="space-y-4">
							{messages.map((message) => (
								<Message
									key={message.id}
									message={message}
									onTranslate={translateMessage}
									onSummarize={summarizeMessage}
								/>
							))}
						</div>
					)}
				</div>
				{error && (
					<div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
						<p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
					</div>
				)}
				<div ref={messagesEndRef} />
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sticky bottom-0 z-10">
					<div className="flex gap-2">
						<div className="flex-1">
							<MessageInput
								value={inputValue}
								onChange={setInputValue}
								onSend={handleSendMessage}
								isLoading={isLoading}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
