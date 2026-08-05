
import { getDictionary } from "@/app/lib/get-dictionary";
import LonersFullResultContent from "@/components/LonersFullResultContent";
import { Locale } from "@/i18n-config";


interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function LonersPaidFormPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen py-10 px-4">
     <LonersFullResultContent dict={dict} lang={lang} />
    </main>
  );
}