import React, { useState } from "react";
import { Message as MessageType } from "@/app/lib/types";
import { formatTimestamp } from "@/app/utils/helpers";
import { LanguageSelector } from "./language-selector";
import { Bot } from "lucide-react";

interface MessageProps {
	message: MessageType;
	onTranslate: (
		id: string,
		lang: string,
		textToTranslate?: string
	) => Promise<void>;
	onSummarize: (id: string) => Promise<void>;
}

export const Message: React.FC<MessageProps> = ({
	message,
	onTranslate,
	onSummarize,
}) => {
	const isUser = message.sender === "user";
	const [targetLanguage, setTargetLanguage] = useState("es");
	const [isTranslating, setIsTranslating] = useState(false);
	const [isSummarizing, setIsSummarizing] = useState(false);

	const languageMap: { [key: string]: string } = {
		en: "English",
		es: "Spanish",
		fr: "French",
		pt: "Portuguese",
		ru: "Russian",
		tr: "Turkish",
	};

	const handleSummarize = async () => {
		setIsSummarizing(true);
		await onSummarize(message.id);
		setIsSummarizing(false);
	};

	const handleTranslateSummary = async () => {
		if (message.summary) {
			setIsTranslating(true);
			await onTranslate(message.id, targetLanguage, message.summary);
			setIsTranslating(false);
		}
	};

	const handleTranslate = async () => {
		setIsTranslating(true);
		await onTranslate(message.id, targetLanguage);
		setIsTranslating(false);
	};

	return (
		<div className="w-full mb-6">
			<div
				className={`flex ${
					isUser ? "justify-end" : "justify-start"
				} mb-2 animate-slideIn`}
			>
				<div
					className={`
          relative max-w-[80%] rounded-2xl p-4 
          ${
						isUser
							? "bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-auto rounded-br-none shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
							: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-bl-none shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
					}
        `}
				>
					<div className="flex items-start justify-between gap-3">
						<p
							className={`text-${
								isUser ? "white" : "gray-800 dark:text-white"
							} leading-relaxed`}
						>
							{message.text}
						</p>
						<span className="text-xs opacity-75 whitespace-nowrap mt-1 font-medium">
							{formatTimestamp(String(message.timestamp))}
						</span>
					</div>

					{message.detectedLanguage && (
						<div className="mt-2 text-xs font-medium inline-block px-2 py-1 rounded-full bg-black/10 dark:bg-white/10">
							I&apos;m {message.detectedLanguage}.
						</div>
					)}

					{isUser && (
						<div className="mt-2">
							{message.text.length > 150 && !message.summary && (
								<button
									onClick={handleSummarize}
									className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
								>
									Summarize in English
								</button>
							)}
							{message.summary && (
								<>
									<LanguageSelector
										selectedLanguage={targetLanguage}
										onChange={setTargetLanguage}
									/>
									<button
										onClick={handleTranslateSummary}
										className="mt-2 p-2 bg-blue-500 text-white rounded-lg text-xs ml-3"
									>
										Translate Summary
									</button>
								</>
							)}
							{message.text.length <= 150 && (
								<>
									<LanguageSelector
										selectedLanguage={targetLanguage}
										onChange={setTargetLanguage}
									/>
									<button
										onClick={handleTranslate}
										className="mt-2 p-2 bg-blue-500 text-white rounded-lg text-xs ml-3"
									>
										Translate
									</button>
								</>
							)}
						</div>
					)}

					{message.text.length <= 150 ? (
						<div className="mt-2 text-sm text-gray-300 dark:text-gray-300">
							Your text is below 150 characters and can easily be translated.
						</div>
					) : (
						<div className="mt-2 text-sm text-gray-300 dark:text-gray-300">
							Your text is more than 150 characters and will need to be
							summarized
						</div>
					)}

					{message.error && (
						<div className="mt-3 p-3 bg-red-500/20 rounded-lg text-sm border border-red-500/30">
							{message.error}
						</div>
					)}
				</div>
			</div>

			{(isTranslating || isSummarizing) && (
				<div className="flex items-start gap-3">
					<div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
						<Bot className="w-5 h-5 text-white" />
					</div>
					<div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 animate-pulse bg-green-50 dark:bg-green-900/20 py-2 px-4 rounded-lg">
						<span>
							{isSummarizing
								? "Bot is summarizing..."
								: "Bot is translating..."}
						</span>
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

			{(message.translation || message.summary) && (
				<div className={`flex justify-${isUser ? "start" : "end"} mt-2`}>
					<div
						className={`
            max-w-[75%] space-y-3 rounded-xl p-4
            bg-gradient-to-br from-green-500 to-green-600 text-white
            shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all
          `}
					>
						{message.translation && (
							<div className="animate-fadeIn">
								<p className="text-sm font-medium mb-1 text-white/80">
									Translation to {languageMap[targetLanguage]}
								</p>
								<p className="text-sm leading-relaxed">{message.translation}</p>
							</div>
						)}
						{message.summary && (
							<div className="animate-fadeIn pt-3 border-t border-white/20">
								<p className="text-sm font-medium mb-1 text-white/80">
									Summary
								</p>
								<p className="text-sm leading-relaxed">{message.summary}</p>
								{message.translatedSummary && (
									<div className="mt-2">
										<p className="text-sm font-medium mb-1 text-white/80">
											Translated Summary to {languageMap[targetLanguage]}
										</p>
										<p className="text-sm leading-relaxed">
											{message.translatedSummary}
										</p>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
