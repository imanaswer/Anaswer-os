"use client";

import dynamic from "next/dynamic";

const OS = dynamic(() => import("@/components/os/OS"), { ssr: false });

export default function Home() {
  return <OS />;
}
