import React from "react";
import { Message } from "@/app/lib/types";
import { languages } from "@/app/lib/api";
import { Button } from "../ui/button";

interface MessageActionsProps {
	message: Message;
	onTranslate: (id: number, lang: string) => void;
	onSummarize: (id: number) => void;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
	message,
	onTranslate,
	onSummarize,
}) => {
	return (
		<div className="mt-3 space-y-2">
			{message.text.length > 150 && !message.summary && (
				<Button
					onClick={() => onSummarize(message.id)}
					isLoading={message.isSummarizing}
					variant="secondary"
					className="w-full bg-white/20 hover:bg-white/30"
				>
					Summarize First
				</Button>
			)}

			{(message.text.length <= 150 || message.summary) && (
				<div className="flex gap-2 animate-slideUp">
					<select
						onChange={(e) => onTranslate(message.id, e.target.value)}
						className="flex-1 bg-white/20 text-white rounded-lg px-3 py-2
                      focus:outline-none focus:ring-2 focus:ring-white/50"
						disabled={message.isTranslating}
						defaultValue=""
					>
						<option value="" disabled>
							Translate to...
						</option>
						{languages.map((lang) => (
							<option key={lang.code} value={lang.code}>
								{lang.name}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	);
};
