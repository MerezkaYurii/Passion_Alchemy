"use client";

import { useEffect, use, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PageProps {
  params: Promise<{ lang: string }>;
}

function SuccessContent({ lang }: { lang: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const rawSavedLang = localStorage.getItem("app_lang") || lang;
    const langMap: Record<string, string> = {
      Русский: "ru",
      English: "en",
      ru: "ru",
      en: "en",
    };
    const savedLang = langMap[rawSavedLang] || lang || "en";
    console.log(savedLang, "savedLang (normalized)");

    const wantedProduct = searchParams.get("wanted_product");

    if (wantedProduct) {
      const targetPath = wantedProduct.endsWith("PaidForm")
        ? wantedProduct
        : `${wantedProduct}PaidForm`;

      router.replace(`/${savedLang}/${targetPath}`);
    } else {
      router.replace(`/${savedLang}`);
    }
  }, [lang, router, searchParams]);

  return null;
}

export default function SuccessPage({ params }: PageProps) {
  const { lang } = use(params);

  return (
    <Suspense fallback={null}>
      <SuccessContent lang={lang} />
    </Suspense>
  );
}
// https://localhost:3000/en/success?wanted_product=loners
// https://localhost:3000/en/success?wanted_product=couple
