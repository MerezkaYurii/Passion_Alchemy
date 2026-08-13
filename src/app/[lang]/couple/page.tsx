import { getDictionary } from "@/app/lib/get-dictionary";
import CouplesContent from "@/components/CouplesContent";

import Link from "next/link";

export default async function CouplesPage({
  params,
}: {
  params: Promise<{ lang: "en" | "ru" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* <div className="absolute inset-0   mb-16 mt-[70px]">
          <Image
            src="/bgCouple.jpg"
            alt="Theme background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div> */}
      </div>
      <Link
        href={`/${lang}/`}
        className="text-sm z-10 mt-4 text-white hover:underline hover:text-gray-400 whitespace-nowrap text-center block"
      >
        ← Back / Назад
      </Link>
      <div className="container w-full max-w-4xl bg-gray-800/40 mb-20 mt-6 z-10">
        <CouplesContent lang={lang} dict={dict} />
      </div>
    </main>
  );
}
