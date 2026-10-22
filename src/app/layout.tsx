import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Centro de Especialistas La Candelaria | CENCA S.A.S.",
  description: "Centro de Especialistas La Candelaria (CENCA S.A.S.) - Atención médica integral con especialistas de alta calidad. Cuidamos su salud con calidez humana.",
  keywords: ["centro médico", "especialistas", "salud", "CENCA", "La Candelaria", "médico", "Colombia"],
  authors: [{ name: "CENCA S.A.S." }],
  icons: {
    icon: "/logo-candelaria.jpg",
  },
  openGraph: {
    title: "Centro de Especialistas La Candelaria",
    description: "Atención médica integral con especialistas de alta calidad.",
    siteName: "CENCA S.A.S.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <SonnerToaster richColors position="top-right" />
      </body>
    </html>
  );
}
