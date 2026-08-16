import React, { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUp, Send, Twitter, TrendingUp, BarChart2 } from "lucide-react";
import { SOCIAL_LINKS } from "./types";

// Import Sections
import Home from "./components/Home";
import Tokenomics from "./components/Tokenomics";
import DexscreenerChart from "./components/DexscreenerChart";
import HowToBuy from "./components/HowToBuy";
import Footer from "./components/Footer";

// Click Explosion Component for magical effects
function ClickExplosion({ x, y }: { x: number; y: number }): React.JSX.Element {
  const logoUrl = "https://sf4service.site/raw/img_qvlhd2ibc.jpg";
  const numParticles = 14;

  return (
    <div className="absolute pointer-events-none" style={{ left: x, top: y }}>
      {Array.from({ length: numParticles }).map((_, i) => {
        const isLogo = i % 3 === 0; // 1 out of 3 is a logo, the rest are glitters/stars
        const angle = (i * 2 * Math.PI) / numParticles + (Math.random() * 0.4 - 0.2);
        const distance = 35 + Math.random() * 85;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        const size = isLogo ? 14 + Math.random() * 16 : 8 + Math.random() * 10;

        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: targetX,
              y: targetY,
              scale: [0, 1.2, 1, 0],
              opacity: [1, 1, 0.7, 0],
              rotate: Math.random() * 360 + 180
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
            style={{ width: size, height: size }}
          >
            {isLogo ? (
              <img
                src={logoUrl}
                alt=""
                className="w-full h-full rounded-full border border-brand-pink-400 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-yellow-300 drop-shadow-[0_0_5px_rgba(250,204,21,0.9)] filter text-xs block font-bold">
                {["⭐", "✨", "💫", "💖"][i % 4]}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Track global clicks for particle explosion
  const [clicks, setClicks] = useState<{ id: string; x: number; y: number }[]>([]);

  // Monitor Scroll for sticky header, active highlights, and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // 1. Sticky state
      setScrolled(window.scrollY > 40);
      
      // 2. Scroll top visibility
      setShowScrollTop(window.scrollY > 500);

      // 3. Highlight current section in nav
      const sections = ["home", "tokenomics", "dexscreener-live-chart", "how-to-buy"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  // Click Handler for magical explosions
  const playExplosionSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Sound component 1: Low-frequency pop/thud
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(160, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.12);
      
      gain1.gain.setValueAtTime(0.2, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.15);

      // Sound component 2: High-frequency magic bell/glitter sparkle
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.25);

      gain2.gain.setValueAtTime(0.12, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn("Audio Context not supported or blocked by autoplay constraints", e);
    }
  };

  const handleGlobalClick = (e: MouseEvent<HTMLDivElement>) => {
    const id = `${Date.now()}-${Math.random()}`;
    setClicks(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
    playExplosionSound();

    // Clean up explosion instance after 1 second
    setTimeout(() => {
      setClicks(prev => prev.filter(c => c.id !== id));
    }, 1000);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "tokenomics", label: "Tokenomics" },
    { id: "dexscreener-live-chart", label: "Live Chart" },
    { id: "how-to-buy", label: "How to Buy" }
  ];

  return (
    <div 
      onClick={handleGlobalClick}
      className="relative min-h-screen text-brand-pink-100 flex flex-col font-sans select-none selection:bg-brand-pink-500 selection:text-black"
    >
      
      {/* 1. STICKY GLASSMORPHIC HEADER */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-[#0b0206]/85 backdrop-blur-md border-b border-brand-pink-500/20 py-3.5 shadow-lg shadow-black/40" 
          : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button 
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer group"
          >
            <div className="relative p-0.5 rounded-full bg-brand-pink-500 group-hover:scale-105 transition-transform duration-300 pink-glow-sm">
              <img 
                src="https://sf4service.site/raw/img_qvlhd2ibc.jpg" 
                alt="Unipepe Brand Logo" 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-black"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <span className="font-display font-black text-lg sm:text-xl md:text-2xl text-white tracking-wide block">
                UNI<span className="text-brand-pink-500">PEPE</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase text-brand-pink-300 tracking-wider block -mt-1.5">
                $PEPPY Token
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-black/40 rounded-full border border-brand-pink-500/10 backdrop-blur-sm">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-300 uppercase cursor-pointer ${
                  activeSection === item.id
                    ? "bg-brand-pink-500 text-black font-extrabold shadow-sm animate-pulse"
                    : "text-brand-pink-300/85 hover:text-white hover:bg-brand-pink-500/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Header Action Swap Link */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-2">
              <a 
                href={SOCIAL_LINKS.twitter} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-brand-pink-950/40 border border-brand-pink-500/10 rounded-lg text-brand-pink-400 hover:text-white hover:bg-brand-pink-500 hover:border-brand-pink-400 transition-all duration-200"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href={SOCIAL_LINKS.telegram} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 bg-brand-pink-950/40 border border-brand-pink-500/10 rounded-lg text-brand-pink-400 hover:text-white hover:bg-brand-pink-500 hover:border-brand-pink-400 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={() => scrollToSection("how-to-buy")}
              className="px-5 py-2.5 bg-brand-pink-500 hover:bg-brand-pink-400 text-black font-extrabold text-xs font-display rounded-full tracking-wide uppercase shadow-md transition-all duration-300 hover:scale-102 cursor-pointer border-b-2 border-brand-pink-700"
            >
              Buy $PEPPY 🦄
            </button>
          </div>

          {/* Mobile Menu Toggle Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-brand-pink-950/40 border border-brand-pink-500/20 text-brand-pink-400 hover:text-white hover:bg-brand-pink-500/20 transition-all cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </header>

      {/* 2. MOBILE RESPONSIVE NAVIGATION DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[70px] left-0 w-full z-40 bg-[#0b0206]/98 backdrop-blur-lg border-b border-brand-pink-500/20 shadow-2xl flex flex-col p-6 space-y-5 md:hidden"
          >
            <div className="flex flex-col gap-2.5">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full py-3.5 rounded-2xl text-sm font-bold uppercase transition-all duration-200 text-center border cursor-pointer ${
                    activeSection === item.id
                      ? "bg-brand-pink-500 text-black border-brand-pink-500 shadow-md font-extrabold pink-glow-sm"
                      : "bg-black/30 text-brand-pink-300 border-brand-pink-500/10 hover:bg-brand-pink-500/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-pink-500/15 flex flex-col gap-3.5">
              <button
                onClick={() => scrollToSection("how-to-buy")}
                className="w-full py-4 bg-brand-pink-500 hover:bg-brand-pink-400 text-black font-extrabold text-sm font-display rounded-2xl text-center shadow-lg cursor-pointer"
              >
                BUY $PEPPY 🦄
              </button>
              
              <div className="flex justify-center gap-4 text-brand-pink-400">
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noreferrer" className="p-3 bg-brand-pink-950/50 rounded-full border border-brand-pink-500/20 hover:text-white">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.telegram} target="_blank" rel="noreferrer" className="p-3 bg-brand-pink-950/50 rounded-full border border-brand-pink-500/20 hover:text-white">
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. CORE CONTENT (SCROLL SECTIONS) */}
      <main className="flex-grow">
        <Home />
        <Tokenomics />
        <DexscreenerChart />
        <HowToBuy />
      </main>

      {/* 4. FOOTER */}
      <Footer />

      {/* 5. FLOATING SCROLL TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 p-3 bg-brand-pink-500 text-black rounded-full shadow-xl hover:bg-brand-pink-400 hover:scale-110 active:scale-95 transition-all duration-300 pink-glow cursor-pointer border-2 border-black"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 font-black" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* 6. GLOBAL EXPLOSION LAYERING */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {clicks.map(click => (
          <div key={click.id}>
            <ClickExplosion x={click.x} y={click.y} />
          </div>
        ))}
      </div>

      {/* LEFT SIDEBAR FLOATING ICONS */}
      <div className="fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3.5">
        {[
          {
            name: "Telegram",
            icon: <Send className="w-5 h-5 text-brand-pink-400 group-hover:text-white" />,
            url: SOCIAL_LINKS.telegram,
            color: "hover:bg-[#0088cc]/20 hover:border-[#0088cc]"
          },
          {
            name: "Twitter",
            icon: <Twitter className="w-5 h-5 text-brand-pink-400 group-hover:text-white" />,
            url: SOCIAL_LINKS.twitter,
            color: "hover:bg-[#1da1f2]/20 hover:border-[#1da1f2]"
          },
          {
            name: "Dexscreener",
            icon: <TrendingUp className="w-5 h-5 text-brand-pink-400 group-hover:text-white" />,
            url: SOCIAL_LINKS.dexscreener,
            color: "hover:bg-brand-pink-500/20 hover:border-brand-pink-400"
          },
          {
            name: "Dextools",
            icon: <BarChart2 className="w-5 h-5 text-brand-pink-400 group-hover:text-white" />,
            url: "https://www.dextools.io",
            color: "hover:bg-purple-500/20 hover:border-purple-400"
          }
        ].map((item, idx) => (
          <motion.a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.15, x: 4 }}
            className={`group p-3 sm:p-3.5 bg-black/85 backdrop-blur-md border-2 border-brand-pink-500/30 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 pink-glow-sm relative ${item.color}`}
          >
            {item.icon}
            
            {/* Tooltip on hover */}
            <span className="absolute left-full ml-3 px-2.5 py-1 bg-[#0b0206] border border-brand-pink-500/30 text-brand-pink-100 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 whitespace-nowrap z-50 shadow-md">
              {item.name}
            </span>
          </motion.a>
        ))}
      </div>



    </div>
  );
}
