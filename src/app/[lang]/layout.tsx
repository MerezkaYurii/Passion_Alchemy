import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";

import { getDictionary } from "@/app/lib/get-dictionary";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { i18n } from "@/i18n-config";
import { DictionaryProvider } from "@/app/DictionaryContext";

export const metadata: Metadata = {
  /// добавить адрес сайта
  metadataBase: new URL("http://localhost:3000"),
  title: "Passion Alchemy",
  icons: {
    icon: "/LogoImage1.jpg",
  },
  openGraph: {
    title: "Passion Alchemy",
    url: "https://passion-alchemy.vercel.app",
    siteName: "PassionAlchemy",
    images: [
      {
        url: "https://passion-alchemy.vercel.app/LogoBgWhite.jpg",
        width: 1200,
        height: 630,
        alt: "Passion Alchemy preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passion Alchemy",
    images: ["https://passion-alchemy.vercel.app/LogoBgWhite.jpg"],
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string; // Next.js требует string для динамических сегментов
  }>;
}
// 2. Настраиваем шрифт Roboto
const roboto = Roboto({
  subsets: ["latin", "cyrillic"], // Включаем поддержку украинского языка
  weight: ["300", "400", "500", "700", "900"], // Веса: от легкого до супер-жирного
  variable: "--font-roboto", // Создаем CSS-переменную для Tailwind v4
});

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang;

  const allowedLocales = ["en", "ru"];
  const currentLocale = allowedLocales.includes(lang)
    ? (lang as "en" | "ru")
    : "en";
  const dict = await getDictionary(currentLocale);

  return (
    <html lang={currentLocale}>
      <body
        className={`${roboto.variable} ${roboto.className} min-h-screen flex flex-col antialiased`}
      >
        <DictionaryProvider dictionary={dict}>
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 dark:hidden mb-16 mt-[70px]">
              <Image
                src="/mainBg.jpg"
                alt="Theme background"
                fill
                priority
                sizes="100vw"
                className="object-cover "
              />
            </div>
          </div>
          <div className="relative z-10 flex flex-col grow min-h-screen">
            <Header />
            <main className="grow pt-17.5">
              {children}

              <Toaster position="top-center" reverseOrder={false} />
            </main>

            <footer className=" relative z-40 ">
              <Footer />
            </footer>
          </div>
        </DictionaryProvider>
        <script src="https://gumroad.com/js/gumroad.js" async></script>
      </body>
    </html>
  );
}
