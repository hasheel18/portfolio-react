import { useEffect } from "react";

import GlobalElements from "./components/GlobalElements.jsx";
import SnapTrack from "./components/SnapTrack.jsx";
import MobileNav from "./components/MobileNav.jsx";
import Navbar from "./components/Navbar.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Footer from "./components/Footer.jsx";

import Hero from "./sections/Hero.jsx";
import TechStrip from "./sections/TechStrip.jsx";
import About from "./sections/About.jsx";
import Work from "./sections/Work.jsx";
import Certifications from "./sections/Certifications.jsx";
import Blogs from "./sections/Blogs.jsx";
import Contact from "./sections/Contact.jsx";

export default function App() {
  useEffect(() => {
    if (window.__LEGACY_INIT__) return;
    window.__LEGACY_INIT__ = true;

    import("./legacy.js");
  }, []);

  return (
    <>
      <GlobalElements />
      <SnapTrack />
      <MobileNav />
      <Navbar />

      <Hero />
      <TechStrip />
      <About />
      <Work />
      <Certifications />
      <Blogs />
      <Contact />

      <BackToTop />
      <Footer />
    </>
  );
}