import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "TODO App",
    description: "Created by Hanna S.",
    icons: {
        icon: '/favicon/favicon.ico'
    }
};

type PropType = { children: React.ReactNode };
export default function RootLayout({children}: Readonly<PropType>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className="bg-background text-foreground antialiased h-full w-full relative" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <Header/>
            <main className=" w-full min-h-[85vh] p-[1vw] pl-0">{children}</main>
            <Footer/>
        </ThemeProvider>
        </body>
        </html>
    );
}
