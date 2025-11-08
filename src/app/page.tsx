import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

import TabFeatureSection from "@/components/TabFeatureSection";
import InsiderSection from "@/components/InsiderSection";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TabFeatureSection />

      <InsiderSection />
    </>
  );
}
