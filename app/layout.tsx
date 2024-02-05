import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import SessisonProvider from "../components/SessisonProvider";

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(defaultUrl),
	title: {
		template: "%s | Know More",
		default: "Know More",
	},
	authors: {
		name: "",
	},

	description: "",
	openGraph: {
		title: "Know More",
		description: "",
		url: "",
		siteName: "",
		images: "/og.png",
		type: "website",
	},
	keywords: [],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className="bg-background text-foreground"
			>
				<main className="max-w-7xl mx-auto lg:py-10 space-y-10 p-5 lg:p-0">
					{children}
				</main>
				<Toaster />
				<SessisonProvider />
			</body>
		</html>
	);
}
