"use client";

import React from "react";
import Desc from "@/components/Desc";
import Nav from "@/components/Nav/index";
import MainLayout from "@/components/mainLayout";
import Checkout from "@/components/stripe/Checkout";


export default function Home() {
	return (
		<div
			className="box-border p-[1%_3%_0_3%] w-full h-full"
		>
			<Nav />
			<main className="mx-auto pt-2 mt-5">
				<Desc />
				<MainLayout></MainLayout>
			</main>
		</div>
	);
}
