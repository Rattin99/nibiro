import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

import TabFeatureSection from "@/components/TabFeatureSection";
import InsiderSection from "@/components/InsiderSection";
import Testimonials from "@/components/Testimonials";
import Manifesto from "@/components/Manifesto";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TabFeatureSection />
      <InsiderSection />
      <Testimonials />
      <Manifesto />
      <Footer />
    </>
  );
}
