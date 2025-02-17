import React from "react";
import { Message as MessageType } from "@/app/lib/types";
import { formatTimestamp } from "@/app/utils/helpers";
import { MessageActions } from "./message-action";

interface MessageProps {
	message: MessageType;
	onTranslate: (id: number, lang: string) => void;
	onSummarize: (id: number) => void;
}

export const Message: React.FC<MessageProps> = ({
	message,
	onTranslate,
	onSummarize,
}) => {
	const isUser = message.sender === "user";

	return (
		<div
			className={`flex ${
				isUser ? "justify-end" : "justify-start"
			} mb-4 animate-slideIn`}
		>
			<div
				className={`
        max-w-[80%] rounded-2xl p-4 transition-all duration-300
        ${
					isUser
						? "bg-blue-500 text-white ml-auto rounded-br-none hover:shadow-lg"
						: "bg-gray-200 dark:bg-gray-700 rounded-bl-none hover:shadow-lg"
				}
      `}
			>
				<div className="flex items-start justify-between gap-2">
					<p
						className={`text-${isUser ? "white" : "gray-800 dark:text-white"}`}
					>
						{message.text}
					</p>
					<span className="text-xs opacity-75 whitespace-nowrap mt-1">
						{formatTimestamp(message.timestamp)}
					</span>
				</div>

				{message.detectedLanguage && (
					<p className="text-sm opacity-75 mt-1">
						Language: {message.detectedLanguage}
					</p>
				)}

				{isUser && (
					<MessageActions
						message={message}
						onTranslate={onTranslate}
						onSummarize={onSummarize}
					/>
				)}

				{message.error && (
					<div className="mt-2 p-2 bg-red-500/20 rounded-lg text-sm">
						{message.error}
					</div>
				)}

				{(message.summary || message.translation) && (
					<div className="mt-4 space-y-3 pt-3 border-t border-white/20">
						{message.summary && (
							<div className="bg-white/10 rounded-lg p-3 animate-fadeIn">
								<p className="text-sm font-medium">Summary:</p>
								<p className="text-sm opacity-90">{message.summary}</p>
							</div>
						)}
						{message.translation && (
							<div className="bg-white/10 rounded-lg p-3 animate-fadeIn">
								<p className="text-sm font-medium">Translation:</p>
								<p className="text-sm opacity-90">{message.translation}</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
