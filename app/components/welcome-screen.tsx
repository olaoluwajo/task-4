import React, { useState, useEffect } from "react";
import {
	Stars,
	Languages,
	Sparkles,
	MessageCircle,
	Globe2,
	Zap,
	Brain,
	Cpu,
} from "lucide-react";

const WelcomeScreen = () => {
	const [greeting, setGreeting] = useState("");
	const [typedText, setTypedText] = useState("");
	const textToType = "Your AI Assistant For Language Magic";

	useEffect(() => {
		const hour = new Date().getHours();
		if (hour < 12) setGreeting("Good Morning");
		else if (hour < 17) setGreeting("Good Afternoon");
		else setGreeting("Good Evening");

		let currentIndex = 0;
		const typingInterval = setInterval(() => {
			if (currentIndex <= textToType.length) {
				setTypedText(textToType.slice(0, currentIndex));
				currentIndex++;
			} else {
				clearInterval(typingInterval);
			}
		}, 50);

		return () => clearInterval(typingInterval);
	}, []);

	return (
		<div className="h-full flex flex-col items-center justify-center relative overflow-hidden p-4">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="absolute animate-float opacity-20"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
							animationDelay: `${i * 0.5}s`,
							transform: `rotate(${Math.random() * 360}deg)`,
						}}
					>
						<Globe2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
					</div>
				))}
			</div>

			<div className="text-center space-y-4 sm:space-y-6 w-full max-w-2xl mx-auto px-2 sm:px-4 relative z-10">
				<div className="relative inline-block mx-auto">
					<div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse p-1">
						<div className="w-full h-full bg-white dark:bg-gray-900 rounded-full flex items-center justify-center relative overflow-hidden">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
							<Brain className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 dark:text-blue-400 animate-float" />
						</div>
					</div>

					{[...Array(3)].map((_, i) => (
						<div
							key={i}
							className="absolute w-5 h-5 sm:w-6 sm:h-6"
							style={{
								animation: `orbit ${3 + i}s linear infinite`,
								transform: `rotate(${120 * i}deg)`,
							}}
						>
							<div className="relative w-full h-full">
								<Stars
									className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 absolute animate-pulse"
									style={{ animationDelay: `${i * 0.3}s` }}
								/>
							</div>
						</div>
					))}

					<Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-sparkle" />
					<Cpu className="absolute -top-2 -right-2 w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse" />
				</div>

				<div className="space-y-2 sm:space-y-3">
					<h2 className="text-xl sm:text-2xl md:text-3xl font-bold animate-gradient-x bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text px-2">
						{greeting}, Welcome to OLAI Translator
					</h2>
					<div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300">
						<Languages className="w-4 h-4 sm:w-5 sm:h-5 " />
						<p className="text-base sm:text-lg h-6 overflow-hidden">
							{typedText}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2">
					<div className="group p-3 sm:p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-100 dark:border-blue-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
						<div className="flex items-center gap-2">
							<MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 group-hover:animate-bounce" />
							<p className="text-blue-700 dark:text-blue-300 font-medium text-sm sm:text-base">
								Real-time Translation
							</p>
						</div>
					</div>
					<div className="group p-3 sm:p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-100 dark:border-purple-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
						<div className="flex items-center gap-2">
							<Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400 group-hover:animate-bounce" />
							<p className="text-purple-700 dark:text-purple-300 font-medium text-sm sm:text-base">
								Smart Summarization
							</p>
						</div>
					</div>
				</div>

				<div className="relative pt-2">
					<p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 animate-float px-4">
						Start a conversation by typing your message below 
					</p>
					<div className="absolute left-1/2 transform -translate-x-1/2 mt-2">
						<div className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce">↓</div>
					</div>
				</div>
			</div>

			<style jsx global>{`
				@keyframes orbit {
					from {
						transform: rotate(0deg) translateX(1.5rem) rotate(0deg);
					}
					to {
						transform: rotate(360deg) translateX(1.5rem) rotate(-360deg);
					}
				}

				@keyframes float {
					0%,
					100% {
						transform: translateY(0);
					}
					50% {
						transform: translateY(-5px);
					}
				}

				@keyframes sparkle {
					0%,
					100% {
						opacity: 1;
						transform: scale(1);
					}
					50% {
						opacity: 0.5;
						transform: scale(1.1);
					}
				}

				@keyframes gradient-x {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}

				.animate-gradient-x {
					background-size: 200% 200%;
					animation: gradient-x 15s ease infinite;
				}

				.animate-float {
					animation: float 3s ease-in-out infinite;
				}

				.animate-sparkle {
					animation: sparkle 2s ease-in-out infinite;
				}

				.animate-spin-slow {
					animation: spin 3s linear infinite;
				}

				@media (max-width: 640px) {
					@keyframes orbit {
						from {
							transform: rotate(0deg) translateX(1rem) rotate(0deg);
						}
						to {
							transform: rotate(360deg) translateX(1rem) rotate(-360deg);
						}
					}
				}
			`}</style>
		</div>
	);
};

export default WelcomeScreen;
