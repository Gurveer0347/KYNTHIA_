import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Tiers from "@/components/Tiers";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import BrandOrb from "@/components/BrandOrb";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Navbar />
      <BrandOrb />
      <main>
        <Hero loaded={loaded} />
        <Marquee />
        <Manifesto />
        <Tiers />
        <Portfolio />
        <Process />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
