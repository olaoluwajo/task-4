import React from "react";

interface LanguageSelectorProps {
	selectedLanguage: string;
	onChange: (lang: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
	selectedLanguage,
	onChange,
}) => {
	const languages = [
		{ code: "en", name: "English" },
		{ code: "es", name: "Spanish" },
		{ code: "fr", name: "French" },
		{ code: "pt", name: "Portuguese" },
		{ code: "ru", name: "Russian" },
		{ code: "tr", name: "Turkish" },
	];

	return (
		<select
			value={selectedLanguage}
			onChange={(e) => onChange(e.target.value)}
			className="p-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-xs"
		>
			{languages.map((lang) => (
				<option key={lang.code} value={lang.code}>
					{lang.name}
				</option>
			))}
		</select>
	);
};
