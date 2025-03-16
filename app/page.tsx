"use client";

import { useLoginModal } from "@/hooks/use-login-modal";
import ExcelHeader from "./_components/excel-header"
import { HeroImage } from "./_components/hero-image";
import { useEffect } from "react";

export default function Home() {
  const { onOpen } = useLoginModal();


  useEffect(() => {
    onOpen()
  }, [onOpen])

  return (
    <div className="" onClick={() => onOpen()}>
      <ExcelHeader />
      <HeroImage />
    </div>
  );
}
