import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

import TabFeatureSection from "@/components/TabFeatureSection";
import InsiderSection from "@/components/InsiderSection";
import Testimonials from "@/components/Testimonials";
import Manifesto from "@/components/Manifesto";
import Footer from "@/components/Footer";
import StackingComponent from "@/components/StackingComponent";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StackingComponent>
        <TabFeatureSection />
        <InsiderSection />
        <Manifesto />
      </StackingComponent>
      <Testimonials />

      <Footer />
    </>
  );
}
