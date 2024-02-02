import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "../components/Nav";
import { Toaster } from "@/components/ui/toaster";
import SessisonProvider from "../components/SessisonProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://dailyblog-demo.vercel.app/"),

	title: {
		template: "%s | Daily Blog",
		default: "Daily Blog",
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
				className={cn("antialiased dark:bg-[#09090B]", inter.className)}
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
