"use client";
import React, { useState, useEffect, useRef } from "react";
import { useChat } from "./hooks/use-chat";
import { ThemeToggle } from "./components/ui/theme-toggle";
import { Message } from "./components/chat/chat-container";
import { MessageInput } from "./components/chat/message-input";
import { User, Bot } from "lucide-react";

export default function Page() {
	const [inputValue, setInputValue] = useState("");
	const [isTyping, setIsTyping] = useState(false);
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
			setIsTyping(true);
			await sendMessage(inputValue);
			setInputValue("");
			setIsTyping(false);
		}
	};

	const getTypingMessage = () => {
		if (isTyping) {
			if (messages[messages.length - 1]?.text.length > 150) {
				return "Bot is summarizing...";
			}
			return "Bot is translating...";
		}
		return "";
	};

	return (
		<div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
			<div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-lg">
				<div className="max-w-6xl mx-auto p-4">
					<div className="relative flex flex-col sm:flex-row items-center gap-4">
						<div className="absolute right-0 top-0 sm:hidden">
							<ThemeToggle />
						</div>
						<div className="hidden sm:block border border-gray-200 rounded-xl dark:border-gray-700 shadow-sm">
							<ThemeToggle />
						</div>
						<header className="flex-1 text-center">
							<h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
								AI Translator Pro
							</h1>
							<p className="text-gray-600 dark:text-gray-300">
								Send messages, get translations, and summaries in multiple
								languages
							</p>
						</header>
					</div>
				</div>
			</div>

			<div className="flex-1 overflow-hidden relative max-w-6xl w-full mx-auto p-4">
				<div className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="h-full overflow-y-auto p-6">
						{messages.length === 0 ? (
							<div className="h-full flex items-center justify-center">
								<div className="text-center space-y-4">
									<div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mx-auto flex items-center justify-center">
										<Bot className="w-8 h-8 text-blue-500" />
									</div>
									<p className="text-gray-500 dark:text-gray-400">
										Start a conversation by sending a message
									</p>
								</div>
							</div>
						) : (
							<div className="space-y-6">
								{messages.map((message, index) => (
									<div
										key={message.id}
										className="animate-slideIn"
										style={{
											animationDelay: `${index * 0.1}s`,
										}}
									>
										<div
											className={`flex items-start gap-3 ${
												message.sender === "user"
													? "flex-row-reverse"
													: "flex-row"
											}`}
										>
											<div
												className={`w-8 h-8 rounded-full bg-gradient-to-br ${
													message.sender === "user"
														? "from-blue-500 to-blue-600"
														: "from-green-500 to-green-600"
												} flex items-center justify-center shadow-md`}
											>
												{message.sender === "user" ? (
													<User className="w-5 h-5 text-white" />
												) : (
													<Bot className="w-5 h-5 text-white" />
												)}
											</div>
											<div className="flex-1">
												<Message
													message={message}
													onTranslate={translateMessage}
													onSummarize={summarizeMessage}
												/>
											</div>
										</div>
									</div>
								))}
								{isTyping && (
									<div className="flex items-start gap-3">
										<div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
											<Bot className="w-5 h-5 text-white" />
										</div>
										<div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 animate-pulse bg-green-50 dark:bg-green-900/20 py-2 px-4 rounded-lg">
											<span>{getTypingMessage()}</span>
											<div className="flex space-x-1">
												<div
													className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
													style={{ animationDelay: "0s" }}
												/>
												<div
													className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
													style={{ animationDelay: "0.2s" }}
												/>
												<div
													className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
													style={{ animationDelay: "0.4s" }}
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						)}
						<div ref={messagesEndRef} />
					</div>
				</div>
			</div>

			{error && (
				<div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
					<div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl animate-shake">
						<p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
					</div>
				</div>
			)}

			<div className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg">
				<div className="max-w-6xl mx-auto p-4">
					<MessageInput
						value={inputValue}
						onChange={setInputValue}
						onSend={handleSendMessage}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</div>
	);
}
