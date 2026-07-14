import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Leaf,
  ShoppingCart,
  Truck,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import sideImage from "../assets/landingImage.png";
import logo from "../assets/OIP.webp";

import Footer from "../Componants/Footer";
import Features from "./Features";
import About from "./About";
import Statistics from "./Statistics";
import Contact from "./Contact";

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const sectionMap = {
      "/": "home",
      "/features": "features",
      "/about": "about",
      "/statistics": "statistics",
      "/contact": "contact",
    };

    const sectionId = sectionMap[location.pathname] || "home";
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fff8_0%,#ffffff_100%)] text-slate-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-emerald-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
           <h1 className="text-xl md:text-2xl font-semibold tracking-wide flex align-center items-center gap-2">
                            <span className="text-amber-300"><img className="w-[60px] rounded-full " src={logo} alt="" /></span> FarmConnect
                          </h1>

          <div className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-sm font-medium text-slate-600 transition hover:text-emerald-700">
              Home
            </Link>
            <Link to="/features" className="text-sm font-medium text-slate-600 transition hover:text-emerald-700">
              Features
            </Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 transition hover:text-emerald-700">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium text-slate-600 transition hover:text-emerald-700">
              Contact
            </Link>
          </div>

          <div className="hidden gap-3 md:flex">
            <Link
              to="/farmer"
              className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Farmer Login
            </Link>

            <Link
              to="/buyer"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Buyer Login
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-lg border border-emerald-200 p-2 text-emerald-700 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-emerald-100 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm font-medium text-slate-600 transition hover:text-emerald-700" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/features" className="text-sm font-medium text-slate-600 transition hover:text-emerald-700" onClick={() => setMenuOpen(false)}>
                Features
              </Link>
              <Link to="/about" className="text-sm font-medium text-slate-600 transition hover:text-emerald-700" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="text-sm font-medium text-slate-600 transition hover:text-emerald-700" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
              <Link to="/farmer" className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 text-center" onClick={() => setMenuOpen(false)}>
                Farmer Login
              </Link>
              <Link to="/buyer" className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white text-center" onClick={() => setMenuOpen(false)}>
                Buyer Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.15),_transparent_40%),linear-gradient(90deg,_#f5fff8_0%,_#ecfdf5_100%)]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-24 lg:grid-cols-2">
          <div className="animate-[fadeIn_0.6s_ease-out]">
            <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">
              Fresh From Farm
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
              Connecting
              <span className="text-emerald-700"> Farmers </span>
              Directly With
              <span className="text-emerald-700"> Buyers</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Buy fresh vegetables, fruits, grains, and agricultural products
              directly from trusted farmers. Fair prices, quality products, and
              a seamless marketplace.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/farmer"
                className="flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/buyer"
                className="rounded-xl border border-emerald-700 px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                Buyer Login
              </Link>
            </div>
          </div>

          <div className="animate-[fadeIn_0.8s_ease-out]">
            <img
              src={sideImage}
              alt="Farm"
              className="rounded-[2rem] border border-emerald-100 shadow-[0_20px_60px_-20px_rgba(5,150,105,0.35)]"
            />
          </div>
        </div>

      </section>

      {/* Features */}
      <Features/>     

      {/* About */}
      <About/> 

      {/* Statistics */}
      <Statistics/>  

      {/* CTA */}
      <Contact/>

      {/* Footer */}
      <Footer/>
     
    </div>
  );
};

export default LandingPage;