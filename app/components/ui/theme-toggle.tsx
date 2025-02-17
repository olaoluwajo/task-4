import { useTheme } from "@/app/hooks/use-theme";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
			{theme === "light" ? (
				<Moon className="h-5 w-5" />
			) : (
				<Sun className="h-5 w-5" />
			)}
		</Button>
	);
};
