import { Open_Sans } from "next/font/google";

import { FooterSection } from "@/sections/shared/Footer";

import "../styles/global.scss";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={openSans.className}>
				<main>{children}</main>
				<FooterSection />
			</body>
		</html>
	);
}
