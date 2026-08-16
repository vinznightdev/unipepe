import { motion } from "motion/react";
import { Coins, ShieldAlert, Percent, Flame, Trophy } from "lucide-react";
import { TOKENOMICS_DATA } from "../types";

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 sm:py-28 relative overflow-hidden bg-black/40">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-10 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-brand-pink-900/10 blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[150px] sm:w-[200px] h-[150px] sm:h-[200px] rounded-full bg-brand-pink-500/5 blur-[60px] sm:blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Heading with Scroll in/out support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="text-brand-pink-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2">
            THE PEPPY NUMBERS
          </div>
          
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white">
            TOKEN<span className="text-brand-pink-500 pink-glow-text">OMICS</span>
          </h2>
          
          <div className="w-16 sm:w-24 h-1.5 bg-brand-pink-500 mx-auto mt-4 rounded-full pink-glow-sm" />
        </motion.div>

        {/* Highlight Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-4xl mx-auto p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-brand-pink-950/75 to-purple-950/30 border-2 border-brand-pink-500/30 backdrop-blur-md mb-12 flex flex-col md:flex-row items-center justify-between gap-6 pink-glow-sm"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 rounded-2xl bg-brand-pink-500/10 text-brand-pink-400 border border-brand-pink-500/30 flex-shrink-0">
              <ShieldAlert className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">No Bullshit, No Taxes</h3>
              <p className="text-brand-pink-100/70 text-xs sm:text-sm mt-1 max-w-md">
                Unipepe keeps it purely decentralized. No team wallets, no transaction taxes, and no developer overrides. Completely safe, fair, and fun.
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto justify-center">
            <div className="flex-1 md:flex-none px-4 sm:px-5 py-3 rounded-2xl bg-black/40 border border-brand-pink-500/20 text-center">
              <div className="text-xl sm:text-2xl font-black text-brand-pink-400 font-display">0%</div>
              <div className="text-[10px] text-brand-pink-200/60 uppercase font-semibold">Buy Tax</div>
            </div>
            <div className="flex-1 md:flex-none px-4 sm:px-5 py-3 rounded-2xl bg-black/40 border border-brand-pink-500/20 text-center">
              <div className="text-xl sm:text-2xl font-black text-brand-pink-400 font-display">0%</div>
              <div className="text-[10px] text-brand-pink-200/60 uppercase font-semibold">Sell Tax</div>
            </div>
          </div>
        </motion.div>

        {/* Donut Distribution & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-12">
          
          {/* Visual SVG Donut Representation */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-black/25 border border-brand-pink-500/10"
          >
            <h4 className="text-base sm:text-lg font-bold font-display text-brand-pink-200 mb-6 text-center">Supply Allocation</h4>
            
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Spinning glow ring */}
              <div className="absolute inset-2 rounded-full border-4 border-dashed border-brand-pink-500/10 animate-spin" style={{ animationDuration: '40s' }} />
              
              <svg className="w-40 h-40 sm:w-56 sm:h-56 transform -rotate-90">
                {/* 100% circle background */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="38%"
                  className="stroke-brand-pink-950 fill-none"
                  strokeWidth="22"
                />
                
                {/* 100% Liquidity segment (Burned) */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="38%"
                  className="stroke-brand-pink-500 fill-none animate-pulse"
                  strokeWidth="22"
                  strokeDasharray="238%"
                  strokeDashoffset="0"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 10px rgba(240, 101, 149, 0.6))" }}
                />
              </svg>

              {/* Central Text Panel */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-display text-2xl sm:text-3xl font-black text-white pink-glow-text">100%</span>
                <span className="text-[9px] sm:text-[10px] text-brand-pink-300 font-extrabold uppercase tracking-widest mt-1 px-1">
                  BURNED LP
                </span>
              </div>
            </div>

            {/* Legend indicators */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-brand-pink-500 pink-glow-sm" />
                <span className="text-xs font-bold text-white">100% Liquidity Pool (Burned)</span>
              </div>
            </div>
          </motion.div>

          {/* Core cards container */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOKENOMICS_DATA.map((item, index) => {
              // Icon mapping based on index
              const icons = [
                <Coins className="w-6 h-6 text-brand-pink-400" />,
                <Percent className="w-6 h-6 text-brand-pink-400" />,
                <Flame className="w-6 h-6 text-brand-pink-400" />,
                <Trophy className="w-6 h-6 text-brand-pink-400" />
              ];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-5 sm:p-6 rounded-2xl bg-black/45 border border-brand-pink-500/10 hover:border-brand-pink-500/35 transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
                >
                  {/* Subtle hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  <div className="flex items-center gap-3 mb-4 text-left">
                    <div className="p-2.5 rounded-xl bg-brand-pink-950/60 border border-brand-pink-500/15 group-hover:bg-brand-pink-500/20 transition-all duration-300">
                      {icons[index]}
                    </div>
                    <span className="text-xs font-bold tracking-wider text-brand-pink-300/80 uppercase">
                      {item.label}
                    </span>
                  </div>

                  <div className="text-xl sm:text-2xl font-black font-display text-white mb-2 leading-none text-left">
                    {item.value}
                  </div>

                  <p className="text-xs sm:text-sm text-brand-pink-100/60 leading-relaxed font-medium text-left">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
