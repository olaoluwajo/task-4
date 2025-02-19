import React, { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "../ui/button";

interface MessageInputProps {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
	value,
	onChange,
	onSend,
	isLoading,
}) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	}, [value]);

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSend();
		}
	};

	return (
		<div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
			<div className="flex flex-col gap-2 max-w-4xl mx-auto">
				<div className="flex items-center gap-2">
					<div className="flex-1 relative">
						<input
							type="text"
							value={value}
							onChange={(e) => onChange(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Type a message..."
							className="w-full sm:hidden rounded-lg p-3 pr-12 bg-gray-100 dark:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                h-11 transition-all duration-200"
						/>

						<textarea
							ref={textareaRef}
							value={value}
							onChange={(e) => onChange(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Type your message here... Press Shift + Enter for a new line"
							className="hidden sm:block w-full resize-none rounded-lg p-3 pr-12 bg-gray-100 dark:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                min-h-[80px] max-h-[300px] transition-all duration-200"
							rows={3}
						/>
					</div>
					<Button
						onClick={onSend}
						disabled={!value.trim() || isLoading}
						className="h-11 px-4 transition-all duration-200"
					>
						{isLoading ? (
							<span className="animate-spin">⏳</span>
						) : (
							<Send className="w-5 h-5" />
						)}
					</Button>
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400 text-right">
					{value.length} characters
					{value.length > 150 && " (needs to be summarized)"}
				</div>
			</div>
		</div>
	);
};
