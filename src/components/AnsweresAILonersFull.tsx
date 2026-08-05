"use client";

import { useSearchParams } from "next/navigation";

export default function AnsweresAILonersFull() {
  const searchParams = useSearchParams();
  const resultText = searchParams.get("text");

  return (
    <div className="whitespace-pre-wrap text-white text-base sm:text-lg">
      {resultText || "Результат не найден."}
    </div>
  );
}
