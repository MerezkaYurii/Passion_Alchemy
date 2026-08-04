"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";

import { useDictionary } from "../app/hooks/useDictionary";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "en";
  const dict = useDictionary();

  if (!dict) return null;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/80 shadow-sm text-white transition-colors duration-500 pl-8 pr-8 sm:pl-16 sm:pr-16  md:pl-32 md:pr-32">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center  h-[70px] ">
        <Link href={`/${currentLocale}`} className="flex items-center">
          <svg
            className="w-auto h-10 md:h-16 object-contain"
            viewBox="0 0 1500 300"
          >
            <use
              href={
                currentLocale === "ru"
                  ? "/LogoWhiteRU.svg"
                  : "/LogoWhiteEN.svg"
              }
            />
          </svg>
        </Link>

        <div className="flex items-center justify-end gap-2 sm:gap-4 md:gap-6 flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
