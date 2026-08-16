import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TrendingUp, RefreshCw, BarChart2, DollarSign, ArrowUpRight } from "lucide-react";

export default function DexscreenerChart() {
  // Real-time market stats
  const [price, setPrice] = useState(0.000003429);
  const [priceChange24h, setPriceChange24h] = useState(420.69);
  const [marketCap, setMarketCap] = useState(1442420);
  const [volume24h, setVolume24h] = useState(690420);
  
  const [tickerBlink, setTickerBlink] = useState<"up" | "down" | null>(null);

  // Fetch real-time data from Dexscreener Tokens API based on the contract
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("https://api.dexscreener.com/latest/dex/tokens/0x1FAc9677f6dc1e7aDDf3eB0E4fa2f5FB9aC4F75b");
        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          
          const usdPrice = parseFloat(pair.priceUsd || "0");
          if (usdPrice > 0) {
            setPrice(prev => {
              if (prev !== usdPrice) {
                setTickerBlink(usdPrice > prev ? "up" : "down");
                setTimeout(() => setTickerBlink(null), 800);
              }
              return usdPrice;
            });
          }
          
          if (pair.priceChange && typeof pair.priceChange.h24 !== "undefined") {
            setPriceChange24h(pair.priceChange.h24);
          }
          
          if (pair.fdv) {
            setMarketCap(pair.fdv);
          }
          
          if (pair.volume && pair.volume.h24) {
            setVolume24h(pair.volume.h24);
          }
        }
      } catch (error) {
        console.error("Error loading Dexscreener API:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dexscreener-live-chart" className="py-20 sm:py-28 relative overflow-hidden bg-black/60">
      <div className="absolute top-10 right-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-brand-pink-500/5 blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] rounded-full bg-brand-pink-900/10 blur-[70px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-brand-pink-400 font-extrabold uppercase tracking-widest text-xs sm:text-sm mb-2 block text-center">
            LIVE MARKET ACTION
          </span>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white text-center">
            PEPPY <span className="text-brand-pink-500 pink-glow-text">LIVE CHART</span>
          </h2>
          <div className="w-16 sm:w-24 h-1.5 bg-brand-pink-500 mx-auto mt-4 rounded-full pink-glow-sm" />
        </motion.div>

        {/* STATS STRIP - Perfectly balanced 4 columns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          <div className="p-4 rounded-2xl bg-black/40 border border-brand-pink-500/10 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-brand-pink-300/60 tracking-wider flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-brand-pink-400" /> PRICE USD
            </span>
            <div className={`text-sm sm:text-base md:text-lg font-black font-mono mt-1 transition-all duration-300 ${
              tickerBlink === "up" ? "text-green-400 scale-[1.02] font-bold" : tickerBlink === "down" ? "text-red-400 scale-[1.02]" : "text-white"
            }`}>
              ${price.toFixed(9)}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-brand-pink-500/10 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-brand-pink-300/60 tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-brand-pink-400" /> 24H CHANGE
            </span>
            <div className={`text-sm sm:text-base md:text-lg font-black font-mono mt-1 flex items-center gap-0.5 ${
              priceChange24h >= 0 ? "text-green-400" : "text-red-400"
            }`}>
              <ArrowUpRight className="w-4 h-4" />
              {priceChange24h.toFixed(2)}%
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-brand-pink-500/10 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-brand-pink-300/60 tracking-wider flex items-center gap-1">
              <BarChart2 className="w-3.5 h-3.5 text-brand-pink-400" /> MARKET CAP
            </span>
            <div className="text-sm sm:text-base md:text-lg font-black font-mono mt-1 text-brand-pink-200">
              ${marketCap.toLocaleString()}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-brand-pink-500/10 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-brand-pink-300/60 tracking-wider flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 text-brand-pink-400" /> 24H VOLUME
            </span>
            <div className="text-sm sm:text-base md:text-lg font-black font-mono mt-1 text-brand-pink-200">
              ${volume24h.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Real Live Chart Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="w-full rounded-3xl overflow-hidden border-2 border-brand-pink-500/25 bg-black/45 p-1 pink-glow-sm"
        >
          <style dangerouslySetInnerHTML={{ __html: `
            #dexscreener-embed {
              position: relative;
              width: 100%;
              padding-bottom: 125%;
            }
            @media(min-width:1400px) {
              #dexscreener-embed {
                padding-bottom: 65%;
              }
            }
            #dexscreener-embed iframe {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              border: 0;
            }
          `}} />
          <div id="dexscreener-embed">
            <iframe 
              title="Dexscreener Live Chart"
              src="https://dexscreener.com/robinhood/0x251775a587054a0dd1fe448400e8a3f3ae80c9742fd1cb5ac3394b027c285325?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15"
              className="rounded-2xl"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
