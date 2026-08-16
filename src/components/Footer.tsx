import { useState } from "react";
import { motion } from "motion/react";
import { Twitter, Send, Copy, Check, Sparkles } from "lucide-react";
import { CONTRACT_ADDRESS, SOCIAL_LINKS } from "../types";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  return (
    <footer id="footer" className="bg-black border-t-2 border-brand-pink-500/20 pt-16 pb-8 relative overflow-hidden">
      {/* Subtle glow background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[150px] rounded-full bg-brand-pink-500/10 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Top half with branding & socials */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-brand-pink-500/10"
        >
          
          {/* Logo & title (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3.5 mb-4">
              <img 
                src="https://sf4service.site/raw/img_qvlhd2ibc.jpg" 
                alt="Unipepe Footer Logo" 
                className="w-12 h-12 rounded-full border-2 border-brand-pink-500 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <h3 className="font-display font-black text-2xl text-white tracking-wide">
                  UNI<span className="text-brand-pink-500">PEPE</span>
                </h3>
                <span className="text-[10px] font-extrabold uppercase text-brand-pink-300 tracking-widest block -mt-1">
                  $PEPPY TOKEN
                </span>
              </div>
            </div>
            <p className="text-brand-pink-200/50 text-xs sm:text-sm max-w-sm font-medium">
              The premier pink unicorn meme coin riding the magic waves of the Robinhood Chain. Keep it safe, keep it fun!
            </p>
          </div>

          {/* CA clipboard widget (Col 6-9) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-stretch text-center md:text-left gap-2">
            <span className="text-xs font-bold text-brand-pink-300 uppercase tracking-widest">
              Robinhood Chain Contract
            </span>
            <div className="p-3 rounded-xl bg-brand-pink-950/20 border border-brand-pink-500/15 flex items-center justify-between gap-3 w-full max-w-md">
              <span className="font-mono text-xs text-brand-pink-100 truncate pr-1">
                {truncateAddress(CONTRACT_ADDRESS)}
              </span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-brand-pink-500/10 hover:bg-brand-pink-500 text-brand-pink-400 hover:text-black transition-colors duration-200 cursor-pointer"
                title="Copy address"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Social connections (Col 10-12) */}
          <div className="md:col-span-3 flex justify-center md:justify-end gap-3">
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-brand-pink-950/40 border border-brand-pink-500/10 rounded-xl text-brand-pink-400 hover:text-white hover:bg-brand-pink-500 transition-all duration-300 shadow-sm"
              aria-label="Twitter X Link"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-brand-pink-950/40 border border-brand-pink-500/10 rounded-xl text-brand-pink-400 hover:text-white hover:bg-brand-pink-500 transition-all duration-300 shadow-sm"
              aria-label="Telegram Link"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>

        </motion.div>

        {/* Disclaimer section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          className="py-8 text-center max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-1 text-[10px] bg-brand-pink-950/50 border border-brand-pink-500/15 text-brand-pink-400 uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-md mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink-400 animate-pulse" />
            Meme Coin Disclaimer
          </span>
          <p className="text-[11px] text-brand-pink-200/40 leading-relaxed font-medium">
            $PEPPY is a meme coin with zero intrinsic value, no structural organization, and no expectation of financial return. There is no official development team, formal contract commitments, or guaranteed utilities. $PEPPY is created purely for community engagement, entertainment, and visual joy. Trading cryptocurrencies on the Robinhood Chain involves significant volatility and risks. Please trade responsibly and enjoy the memes!
          </p>
        </motion.div>

        {/* Copyright strip */}
        <div className="text-center pt-4 border-t border-brand-pink-500/5 text-xs text-brand-pink-200/35 font-medium flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Unipepe ($Peppy). All Rights Reserved.</span>
          <span className="flex items-center gap-1.5 text-brand-pink-500/40 font-bold">
            🦄 Built for the fun-loving Robinhood Chain Community 🐸
          </span>
        </div>

      </div>
    </footer>
  );
}
