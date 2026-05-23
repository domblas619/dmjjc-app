import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: {
    default: "Del Mar Jiu-Jitsu Club Community Hub",
    template: "%s | Del Mar Jiu-Jitsu Club"
  },
  description:
    "Academy updates, events, closures, and public training resources for the Del Mar Jiu-Jitsu Club community.",
  applicationName: "Del Mar Jiu-Jitsu Club",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/dmjjc-logo-icon.png",
    apple: "/dmjjc-logo-icon.png"
  },
  appleWebApp: {
    capable: true,
    title: "DMJJC Hub",
    statusBarStyle: "black-translucent"
  },
  formatDetection: { telephone: true },
  metadataBase: new URL("https://delmarjiujitsuclub.com")
};

export const viewport: Viewport = {
  themeColor: "#00aeef",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} min-h-screen font-sans antialiased`}>
        <Header />
        <main className="pb-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom))] pt-[calc(var(--header-height)+env(safe-area-inset-top))] md:pb-10">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
