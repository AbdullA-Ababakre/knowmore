
'use client'

import { Button } from 'antd';
import React, { useTransition } from "react";
import { checkout } from "@/lib/actions/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/store/user";
import LoginForm from "@/components/Nav/LoginForm";

export default function Checkout() {
    //Pay money
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
	const user = useUser((state) => state.user);
	console.log("user111",user);

    const handleCheckOut = () => {
        startTransition(async () => {
            const data = JSON.parse(
                await checkout(user?.email!, location.origin + pathname)
            );
            const result = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
            );

            await result?.redirectToCheckout({ sessionId: data.id });
        });
    };

	if (!user) {
		return (
			<div className="flex items-center justify-center h-96 gap-2">
				<LoginForm /> to continue
			</div>
		);
	}

    return (
        <div>
            <Button onClick={handleCheckOut}>subscribe11</Button>
        </div>
    )
}
