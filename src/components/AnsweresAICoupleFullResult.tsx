"use client";

import { Dictionary } from "@/i18n-config";
import { useState } from "react";

export default function AnsweresAICoupleFullResult({
  dict,
}: {
  dict: Dictionary;
}) {
  const [text] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("lonerResult") || "";
    }
    return "";
  });

  return (
    <div className="whitespace-pre-wrap text-white text-base sm:text-lg">
      {text || dict.AnsweresAILonersFull.result}
    </div>
  );
}
