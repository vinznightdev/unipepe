import { useState } from "react";
import { motion } from "motion/react";
import { Twitter, Send, Copy, Check, TrendingUp, Sparkles } from "lucide-react";
import { CONTRACT_ADDRESS, SOCIAL_LINKS } from "../types";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  return (
    <section id="home" className="relative min-h-screen pt-24 sm:pt-28 pb-12 flex flex-col justify-between overflow-hidden">
      {/* Background Decorative Pink Glowing Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full bg-brand-pink-500/10 blur-[80px] sm:blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-2/3 right-10 w-[200px] h-[200px] rounded-full bg-brand-pink-600/5 blur-[70px] pointer-events-none z-0" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(240,101,149,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(240,101,149,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Hero Content with scroll in/out support */}
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -30, scale: 0.98 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 max-w-6xl flex-grow flex flex-col items-center justify-center relative z-10 text-center mt-6"
      >
        
        {/* Animated Badge */}
        <div 
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink-950/60 border border-brand-pink-500/30 text-brand-pink-300 text-xs sm:text-sm font-semibold tracking-wider mb-8 pink-glow-sm"
          id="badge-robinhood-chain"
        >
          <Sparkles className="w-4 h-4 text-brand-pink-400 animate-pulse" />
          ROBINHOOD CHAIN EXCLUSIVE MEME
        </div>

        {/* Logo Container with neon frame and floating animation */}
        <div className="relative mb-8">
          {/* Neon back ring */}
          <div className="absolute inset-0 rounded-full bg-brand-pink-500/30 blur-2xl animate-pulse" />
          
          <div className="relative p-2 rounded-full bg-gradient-to-tr from-brand-pink-600 via-brand-pink-400 to-brand-pink-700 pink-glow">
            <img 
              src="https://sf4service.site/raw/img_qvlhd2ibc.jpg" 
              alt="Unipepe Logo" 
              className="w-32 h-32 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full object-cover border-4 border-black"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Floating mini-badges */}
          <div className="absolute -top-3 -right-4 bg-brand-pink-600 text-white font-bold text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-lg border border-brand-pink-300/40 rotate-12">
            🦄 UNICORN ENERGY
          </div>

          <div className="absolute -bottom-2 -left-6 bg-brand-pink-900 text-brand-pink-100 font-bold text-[10px] sm:text-xs px-3 py-1 rounded-full shadow-lg border border-brand-pink-500/30 -rotate-12">
            🐸 100% MEME
          </div>
        </div>

        {/* Super title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4 text-white">
          UNI<span className="text-brand-pink-500 pink-glow-text-intense">PEPE</span>
        </h1>

        {/* Token symbol */}
        <div className="font-display text-xl sm:text-3xl text-brand-pink-300 font-bold mb-6 tracking-wide">
          Ticker: <span className="bg-brand-pink-500/20 px-3 py-1 rounded-md text-brand-pink-400 border border-brand-pink-500/30 font-extrabold">$PEPPY</span>
        </div>

        {/* Short, high impact description */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-brand-pink-100/90 leading-relaxed mb-8 font-medium px-4 whitespace-pre-line text-left sm:text-center">
          Peppy the Unicorn Pepe is here.
          {"\n\n"}
          While everyone else is still chasing the next meme, Peppy already claimed the throne. This isn’t just another frog. This is Unipepe — pure pink magic, unicorn energy, and that signature smug face that says “I already won.” Soft, cute, and dangerously based at the same time.
          {"\n\n"}
          The community is growing fast. The vibe is unmatched. The culture is forming in real time. Early holders are already smiling that quiet smile.
          {"\n\n"}
          You can wait and watch… or you can get in while Peppy is still early. Miss this and you’ll be explaining to yourself later why you didn’t move when it was obvious.
          {"\n\n"}
          Peppy doesn’t wait. Neither should you.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mb-8 px-4">
          <a
            href="#how-to-buy"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-brand-pink-500 hover:bg-brand-pink-400 text-black font-extrabold font-display rounded-2xl shadow-lg hover:shadow-brand-pink-500/50 transition-all duration-300 transform hover:-translate-y-1 text-center border-b-4 border-brand-pink-700 active:translate-y-0 active:border-b-0 cursor-pointer flex items-center justify-center gap-2 text-base sm:text-lg"
          >
            BUY $PEPPY 🦄
          </a>
          <a
            href="#dexscreener-live-chart"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-black/50 hover:bg-black/80 text-brand-pink-300 hover:text-brand-pink-100 font-bold rounded-2xl border-2 border-brand-pink-500/50 hover:border-brand-pink-400 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <TrendingUp className="w-5 h-5 text-brand-pink-400" />
            LIVE CHART
          </a>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4 mb-10">
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-brand-pink-950/80 border border-brand-pink-500/20 rounded-full text-brand-pink-400 hover:text-white hover:bg-brand-pink-500 hover:border-brand-pink-400 transition-all duration-300 hover:scale-115 pink-glow-sm"
            aria-label="Unipepe Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href={SOCIAL_LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-brand-pink-950/80 border border-brand-pink-500/20 rounded-full text-brand-pink-400 hover:text-white hover:bg-brand-pink-500 hover:border-brand-pink-400 transition-all duration-300 hover:scale-115 pink-glow-sm"
            aria-label="Unipepe Telegram"
          >
            <Send className="w-6 h-6" />
          </a>
        </div>

        {/* Hype Video Screen Container */}
        <div className="w-full max-w-lg mb-8 rounded-2xl bg-black/90 border-2 border-brand-pink-500/40 shadow-2xl overflow-hidden pink-glow-sm relative group">
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10 bg-black/85 px-3 py-1 rounded-full border border-brand-pink-500/30 text-[10px] sm:text-xs font-black uppercase tracking-wider text-brand-pink-400">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink-500 animate-pulse" />
            PEPPY HYPEMEISTER 🎥
          </div>
          <video
            src="https://sf4service.site/raw/vid_z2x10378m.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto aspect-video object-cover hover:scale-101 transition-transform duration-500"
          />
        </div>

        {/* Contract Widget */}
        <div className="w-full max-w-lg p-1.5 rounded-2xl bg-brand-pink-950/40 border-2 border-brand-pink-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm px-3 pink-glow-sm">
          <div className="flex items-center gap-2 py-2 sm:py-1">
            <span className="text-brand-pink-400 font-bold uppercase tracking-wider text-[10px] sm:text-xs">Contract (Robinhood):</span>
            <span className="font-mono text-brand-pink-100 hidden sm:inline">{CONTRACT_ADDRESS}</span>
            <span className="font-mono text-brand-pink-100 sm:hidden">{truncateAddress(CONTRACT_ADDRESS)}</span>
          </div>
          <button
            onClick={handleCopy}
            className="w-full sm:w-auto px-5 py-2 sm:py-2.5 rounded-xl bg-brand-pink-600/25 hover:bg-brand-pink-500 hover:text-black text-brand-pink-300 font-bold transition-all duration-300 flex items-center justify-center gap-2 border border-brand-pink-500/40 cursor-pointer text-xs sm:text-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Contract
              </>
            )}
          </button>
        </div>

      </motion.div>

      {/* Repeating Marquee Ticker */}
      <div className="w-full bg-brand-pink-600 text-black py-3 select-none overflow-hidden border-y-2 border-brand-pink-400 relative z-10 mt-12 rotate-1 scale-102">
        <div className="animate-marquee-slow whitespace-nowrap flex items-center">
          {Array(8).fill("").map((_, i) => (
            <span key={i} className="text-lg sm:text-xl font-display font-black tracking-widest mx-4 flex items-center gap-4">
              <span>UNIPEPE $PEPPY</span>
              <span className="text-white">🦄</span>
              <span>ROBINHOOD CHAIN</span>
              <span className="text-white">🐸</span>
              <span>NO TAXES</span>
              <span className="text-white">⚡</span>
              <span>TO THE MOON</span>
              <span className="text-white">💖</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
