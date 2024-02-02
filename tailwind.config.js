/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
	  "./app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./components/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
	  extend: {
		colors: {
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  btn: {
			background: "hsl(var(--btn-background))",
			"background-hover": "hsl(var(--btn-background-hover))",
		  },
		  customBlue: "#1371FF", // Custom name for your color
		  lightBlue: "#D0E3FF",
		  iconColor: "#72AAFF",
		},
		fontFamily: {
		  custom: ['"Plus Jakarta Sans"', "sans-serif"],
		  "plus-jakarta": ['"Plus Jakarta Sans"', "sans-serif"],
		},
		fontSize: {
		  custom: "5rem", // Add a custom name if needed
		},
		lineHeight: {
		  custom: "5.3125rem", // Add a custom name if needed
		},
  
		fontSize: {
		  custom: "1.6875rem", // Custom font size
		  large: "3.125rem", // Custom name for 3.125rem font size
		  medium: "1.6875rem", // Custom name for 1.6875rem font size
		},
		spacing: {
		  "mt-custom": "2.24rem", // Custom margin-top
		  "mb-custom": "5.13rem", // Custom margin-bottom
		  "w-custom": "67rem", // Custom width
		  "h-custom": "4.25rem", // Custom height
		},
		borderRadius: {
		  custom: "2.5rem",
		},
		spacing: {
		  "47rem": "47rem",
		  "18.3125rem": "18.3125rem",
		},
		fontWeight: {
		  normal: "400",
		  "semi-bold": "700",
		},
	  },
	},
	plugins: [],
  };
  