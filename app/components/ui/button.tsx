import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	variant?: "primary" | "secondary" | "ghost";
	icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
	children,
	isLoading,
	variant = "primary",
	icon,
	className = "",
	...props
}) => {
	const baseStyles =
		"px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2";

	const variants = {
		primary: "bg-blue-500 hover:bg-blue-600 text-white disabled:bg-blue-300",
		secondary:
			"bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white",
		ghost:
			"hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
	};

	return (
		<button
			className={`${baseStyles} ${variants[variant]} ${className}`}
			disabled={isLoading || props.disabled}
			{...props}
		>
			{isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
			{children}
		</button>
	);
};
