import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

import TabFeatureSection from "@/components/TabFeatureSection";
import InsiderSection from "@/components/InsiderSection";
import Testimonials from "@/components/Testimonials";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TabFeatureSection />
      <InsiderSection />
      <Testimonials />
    </>
  );
}
