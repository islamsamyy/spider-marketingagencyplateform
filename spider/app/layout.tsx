import type { Metadata } from "next";
import "./globals.css";
import CyberSpiderWeb from "../components/CyberSpiderWeb";
import { DataStoreProvider } from "../lib/store";

export const metadata: Metadata = {
  title: "بلاك سبايدر | Black Spider Agency - وكالة نمو رقمي وهندسة برمجية",
  description: "وكالة الجيل الجديد للنمو الرقمي، إدارة الحملات الإعلانية فائقة العائد، وهندسة المنصات الرقمية المتطورة للشركات في الخليج والشرق الأوسط.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-surface-deep text-on-surface antialiased selection:bg-primary-container selection:text-white min-h-screen relative flex flex-col overflow-x-hidden"
        suppressHydrationWarning
      >
        {/* GLOBAL PERSISTENT FULL-PAGE CYBER SPIDER CANVAS (Active across ALL pages & sections) */}
        <CyberSpiderWeb
          className="fixed inset-0 w-full h-full pointer-events-none z-0"
          opacity={0.78}
          fixed={true}
        />

        {/* Global Ambient Red Cyber Grid & Atmospheric Fog */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#442226_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-primary-container/15 rounded-full blur-[180px] pointer-events-none z-0"></div>
        <div className="fixed top-1/2 right-10 w-[450px] h-[450px] bg-primary/10 rounded-full blur-[160px] pointer-events-none z-0"></div>
        <div className="fixed bottom-10 left-1/3 w-[600px] h-[600px] bg-[#bf002a]/10 rounded-full blur-[200px] pointer-events-none z-0"></div>

        <DataStoreProvider>
          <div className="relative z-10 flex flex-col min-h-screen w-full">
            {children}
          </div>
        </DataStoreProvider>
      </body>
    </html>
  );
}
