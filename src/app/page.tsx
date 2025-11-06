import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import TestimonialSection from "@/components/TestimonialSection";
import TabFeatureSection from "@/components/TabFeatureSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TabFeatureSection />
      <TestimonialSection />
    </>
  );
}
