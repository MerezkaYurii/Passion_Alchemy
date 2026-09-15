import HomePageSlider from "@/components/HomePageSlider";

import { getDictionary } from "../lib/get-dictionary";
import RulesModal from "@/components/RulesModal";
import HomePageButtons from "@/components/HomePageButtons";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "ru" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <main className="flex flex-col items-center  mb-10">
      <RulesModal dict={dict} />
      <div className="container w-full max-w-7x bg-gray-800/60 mb-20 mt-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4  text-white text-center font-medium italic mt-6">
          {dict.home.title}
        </h2>
        <HomePageSlider />
        <HomePageButtons />
      </div>
    </main>
  );
}
