"use client";

import { exportElementToPdf } from "@/app/utils/exportPdf";
import { useState } from "react";

interface DownloadPdfButtonProps {
  text: string;
}

export default function DownloadPdfButton({ text }: DownloadPdfButtonProps) {
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    try {
      setLoading(true);
      await exportElementToPdf("pdf-container", "loners-full-report.pdf");
    } catch (err) {
      console.error("Error downloading PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="w-3/4 bg-[#0f3995] hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8"
    >
      {loading ? "Creating PDF..." : text}
    </button>
  );
}
