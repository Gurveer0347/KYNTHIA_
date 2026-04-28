import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import ScrollToTop from "@/components/ScrollToTop";
import { Toaster } from "sonner";

import Home from "@/pages/Home";
import OrionStudio from "@/pages/showcase/OrionStudio";
import MaisonVeil from "@/pages/showcase/MaisonVeil";
import VantaCollective from "@/pages/showcase/VantaCollective";
import MeridianEstates from "@/pages/showcase/MeridianEstates";
import NuageAtelier from "@/pages/showcase/NuageAtelier";
import LumeJournal from "@/pages/showcase/LumeJournal";

function App() {
  return (
    <div className="bg-[#030303] text-white min-h-screen" data-testid="app-root">
      <CustomCursor />
      <NoiseOverlay />
      <BrowserRouter>
        <ScrollToTop />
        <SmoothScroll>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/orion-studio" element={<OrionStudio />} />
            <Route path="/work/maison-veil" element={<MaisonVeil />} />
            <Route path="/work/vanta-collective" element={<VantaCollective />} />
            <Route path="/work/meridian-estates" element={<MeridianEstates />} />
            <Route path="/work/nuage-atelier" element={<NuageAtelier />} />
            <Route path="/work/lume-journal" element={<LumeJournal />} />
          </Routes>
        </SmoothScroll>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#0a0a0a",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            fontFamily: "Manrope, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
