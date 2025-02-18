import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
	title: "HNG TASK 4",
	description: "olaoluwa task 4",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta
					http-equiv="origin-trial"
					content="AnHgnJjgzK7vMtL5pwRp0X+kZZlmDcGbyJQkmTVOXs50YCHxShfkAGnF5KkRrSs/qh5Q03/eyrWktAWZN5992QUAAAByeyJvcmlnaW4iOiJodHRwczovL29sYS1obmd0YXNrNC52ZXJjZWwuYXBwOjQ0MyIsImZlYXR1cmUiOiJUcmFuc2xhdGlvbkFQSSIsImV4cGlyeSI6MTc1MzE0MjQwMCwiaXNTdWJkb21haW4iOnRydWV9"
				/>
			</head>
			<body>
				<ThemeProvider attribute="class">{children}</ThemeProvider>
			</body>
		</html>
	);
}
