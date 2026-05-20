"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
	return (
		<Toaster
			position="top-right"
			toastOptions={{
				style: {
					background: "rgb(24 24 27)",
					color: "rgb(250 250 250)",
					border: "1px solid rgb(39 39 42)",
				},
			}}
		/>
	);
}
