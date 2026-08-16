import { useState } from "react";
import { motion } from "motion/react";
import { Wallet, Key, Sparkles, ArrowRight, Copy, Check } from "lucide-react";
import { HOW_TO_BUY_STEPS, CONTRACT_ADDRESS } from "../types";

export default function HowToBuy() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="how-to-buy" className="py-20 sm:py-28 relative overflow-hidden bg-black/20">
      {/* Decorative Glow elements */}
      <div className="absolute top-1/4 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-brand-pink-500/5 blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-brand-pink-900/10 blur-[70px] sm:blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-brand-pink-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2 block">
            EASY 4-STEP ONBOARDING
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white">
            HOW TO <span className="text-brand-pink-500 pink-glow-text">BUY $PEPPY</span>
          </h2>
          <div className="w-16 sm:w-24 h-1.5 bg-brand-pink-500 mx-auto mt-4 rounded-full pink-glow-sm" />
        </motion.div>

        {/* Highly Responsive Grid layout for Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {HOW_TO_BUY_STEPS.map((step, idx) => {
            const stepIcons = [
              <Wallet className="w-6 h-6 text-brand-pink-400" />,
              <Sparkles className="w-6 h-6 text-brand-pink-400" />,
              <Key className="w-6 h-6 text-brand-pink-400" />,
              <ArrowRight className="w-6 h-6 text-brand-pink-400" />
            ];

            return (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.95 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="p-6 sm:p-8 rounded-3xl bg-black/45 border-2 border-brand-pink-500/10 flex flex-col justify-between hover:border-brand-pink-500/40 hover:scale-[1.02] transition-all duration-300 group relative overflow-hidden pink-glow-sm"
              >
                {/* Visual Accent watermark */}
                <div className="absolute top-2 right-2 sm:right-4 p-2 text-7xl sm:text-8xl font-black text-brand-pink-500/5 select-none font-display pointer-events-none">
                  0{step.stepNumber}
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3.5 rounded-2xl bg-brand-pink-950/60 border border-brand-pink-500/20 group-hover:bg-brand-pink-500/25 transition-all duration-300">
                    {stepIcons[idx]}
                  </div>

                  <div>
                    <span className="text-xs font-bold text-brand-pink-400 uppercase tracking-widest block mb-1">
                      Step 0{step.stepNumber}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="text-brand-pink-100/70 text-xs sm:text-sm leading-relaxed font-medium mt-2 flex-grow">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Contract Address Center Call-To-Action (For easy coping on any device size) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-6 rounded-3xl bg-brand-pink-950/20 border-2 border-brand-pink-500/20 backdrop-blur-md max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pink-glow-sm"
        >
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white font-display">Official Robinhood Contract Address</h4>
            <p className="text-xs text-brand-pink-200/50 mt-1">Copy and paste into Uniswap for trading</p>
          </div>
          
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="px-4 py-2.5 rounded-xl bg-black/60 font-mono text-xs text-brand-pink-200 select-all border border-brand-pink-500/10 truncate max-w-[180px] sm:max-w-[240px]">
              {CONTRACT_ADDRESS}
            </div>
            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-brand-pink-500 hover:bg-brand-pink-400 text-black font-extrabold transition-all duration-200 cursor-pointer flex-shrink-0 flex items-center justify-center gap-1 shadow-md hover:scale-105 active:scale-95"
              title="Copy Address"
            >
              {copied ? <Check className="w-4 h-4 text-green-950" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
