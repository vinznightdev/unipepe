import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, RefreshCw, BarChart2, DollarSign, ArrowUpRight, Users, Flame, Coins, ShieldAlert, Sparkles, ShoppingBag } from "lucide-react";

interface Trade {
  id: string;
  time: string;
  type: "buy" | "sell";
  amountEth: number;
  amountTokens: string;
  priceUsd: string;
  wallet: string;
}

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export default function DexscreenerChart() {
  const [activeTab, setActiveTab] = useState<"interactive" | "embed">("interactive");
  const [timeframe, setTimeframe] = useState<"1m" | "5m" | "15m" | "1h">("15m");
  
  // Real-time market stats
  const [price, setPrice] = useState(0.000003429);
  const [priceChange24h, setPriceChange24h] = useState(420.69);
  const [marketCap, setMarketCap] = useState(1442420);
  const [volume24h, setVolume24h] = useState(690420);
  const [holders, setHolders] = useState(3142);
  
  const [trades, setTrades] = useState<Trade[]>([]);
  const [candles, setCandles] = useState<Candle[]>([]);

  // Sound/Vibe alerts
  const [tickerBlink, setTickerBlink] = useState<"up" | "down" | null>(null);

  // Initialize trade list and candles
  useEffect(() => {
    const wallets = [
      "unipepe_whale.eth", "robinhood_chad.eth", "peppy_warrior.sol", "paperhands_bob.eth", 
      "diamond_frog.sol", "arbitrum_king.eth", "pink_unicorn.eth", "pepe_vip_enjoyer.eth",
      "lh_bagholder.sol", "robinhood_wallet_1.eth", "vitalik_fan.eth", "peppy_maker.sol"
    ];

    const initialTrades: Trade[] = Array.from({ length: 6 }).map((_, i) => {
      const isBuy = Math.random() > 0.3;
      const ethVal = Math.random() * 2 + 0.05;
      const tokVal = (ethVal * 290000000).toLocaleString(undefined, { maximumFractionDigits: 0 });
      return {
        id: `t-${i}`,
        time: new Date(Date.now() - (i * 45000)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: isBuy ? "buy" : "sell",
        amountEth: parseFloat(ethVal.toFixed(3)),
        amountTokens: tokVal,
        priceUsd: (0.000003429 * (1 + (Math.random() * 0.04 - 0.02))).toFixed(9),
        wallet: wallets[Math.floor(Math.random() * wallets.length)]
      };
    });
    setTrades(initialTrades);

    // Initial Candles
    const initialCandles: Candle[] = Array.from({ length: 18 }).map((_, i) => {
      const o = 0.000001000 + (i * 0.000000120);
      const c = o + (Math.random() * 0.000000300 - 0.000000100);
      return {
        time: `${12 + i}:00`,
        open: parseFloat(o.toFixed(9)),
        high: parseFloat((Math.max(o, c) + Math.random() * 0.000000080).toFixed(9)),
        low: parseFloat((Math.min(o, c) - Math.random() * 0.000000080).toFixed(9)),
        close: parseFloat(c.toFixed(9))
      };
    });
    setCandles(initialCandles);
  }, []);

  // Price ticking effect
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.random() * 0.008 - 0.003; // Biased upwards for moonshot energy!
      const dir = change > 0 ? "up" : "down";
      
      setPrice(prev => {
        const next = prev * (1 + change);
        setTickerBlink(dir);
        setTimeout(() => setTickerBlink(null), 800);
        return next;
      });

      // Update change percent, MC, Volume
      setPriceChange24h(prev => prev + (change * 10));
      setMarketCap(prev => Math.round(prev * (1 + change)));
      setVolume24h(prev => Math.round(prev + (Math.random() * 250)));
      
      // Occasionally add a new trade live!
      if (Math.random() > 0.4) {
        const wallets = [
          "unipepe_whale.eth", "robinhood_chad.eth", "peppy_warrior.sol", "diamond_frog.sol", 
          "pink_unicorn.eth", "vitalik_fan.eth", "peppy_maker.sol", "robinhood_wallet_1.eth"
        ];
        const isBuy = Math.random() > 0.25; // 75% buy for bullish meme looks
        const ethVal = Math.random() * 4 + 0.1;
        const tokVal = (ethVal * 290000000).toLocaleString(undefined, { maximumFractionDigits: 0 });
        const newTrade: Trade = {
          id: `t-${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          type: isBuy ? "buy" : "sell",
          amountEth: parseFloat(ethVal.toFixed(3)),
          amountTokens: tokVal,
          priceUsd: (price * (1 + change)).toFixed(9),
          wallet: wallets[Math.floor(Math.random() * wallets.length)]
        };

        setTrades(prev => [newTrade, ...prev.slice(0, 7)]);
        
        // Update current candle
        setCandles(prev => {
          if (prev.length === 0) return prev;
          const copy = [...prev];
          const lastIndex = copy.length - 1;
          const last = copy[lastIndex];
          const nextClose = parseFloat((price * (1 + change)).toFixed(9));
          copy[lastIndex] = {
            ...last,
            close: nextClose,
            high: Math.max(last.high, nextClose),
            low: Math.min(last.low, nextClose)
          };
          return copy;
        });
      }

      // Occasionally add a holder
      if (Math.random() > 0.8) {
        setHolders(prev => prev + 1);
      }

    }, 3200);

    return () => clearInterval(interval);
  }, [price]);

  // Handle manual mock transaction
  const triggerMockBuy = () => {
    const ethVal = 0.5 + Math.random() * 2.5;
    const tokVal = (ethVal * 290000000).toLocaleString(undefined, { maximumFractionDigits: 0 });
    const userTrade: Trade = {
      id: `user-t-${Date.now()}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      type: "buy",
      amountEth: parseFloat(ethVal.toFixed(3)),
      amountTokens: tokVal,
      priceUsd: price.toFixed(9),
      wallet: "YOU (Swapped $PEPPY) 🦄"
    };

    setTrades(prev => [userTrade, ...prev.slice(0, 7)]);
    setPrice(prev => prev * 1.025); // Trigger a nice +2.5% price bump for buying!
    setPriceChange24h(prev => prev + 2.5);
    setMarketCap(prev => Math.round(prev * 1.025));
    setVolume24h(prev => prev + Math.round(ethVal * 3000));
  };

  return (
    <section id="dexscreener-live-chart" className="py-20 sm:py-28 relative overflow-hidden bg-black/60">
      <div className="absolute top-10 right-1/4 w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] rounded-full bg-brand-pink-500/5 blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] rounded-full bg-brand-pink-900/10 blur-[70px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Section Heading with Scroll in/out support */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          viewport={{ once: false, amount: 0.2 }}
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

        {/* Tab Controls with responsive width */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: false, amount: 0.15 }}
          className="flex justify-center gap-3 sm:gap-4 mb-8"
        >
          <button
            onClick={() => setActiveTab("interactive")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === "interactive"
                ? "bg-brand-pink-500 text-black shadow-lg pink-glow-sm"
                : "bg-black/40 border border-brand-pink-500/20 text-brand-pink-300 hover:bg-black/60"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Interactive Terminal
          </button>
          <button
            onClick={() => setActiveTab("embed")}
            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              activeTab === "embed"
                ? "bg-brand-pink-500 text-black shadow-lg pink-glow-sm"
                : "bg-black/40 border border-brand-pink-500/20 text-brand-pink-300 hover:bg-black/60"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            Dexscreener Embed
          </button>
        </motion.div>

        {/* STATS STRIP - Responsive columns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8"
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
            <div className="text-sm sm:text-base md:text-lg font-black font-mono mt-1 text-green-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-4 h-4" />
              {priceChange24h.toFixed(2)}%
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-brand-pink-500/10 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-brand-pink-300/60 tracking-wider flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-brand-pink-400" /> MARKET CAP
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

          <div className="p-4 col-span-2 sm:col-span-1 rounded-2xl bg-black/40 border border-brand-pink-500/10 flex flex-col justify-center text-left">
            <span className="text-[10px] sm:text-xs font-semibold uppercase text-brand-pink-300/60 tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-brand-pink-400" /> HOLDERS
            </span>
            <div className="text-sm sm:text-base md:text-lg font-black font-mono mt-1 text-brand-pink-200">
              {holders.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* TAB CONTENTS with Scroll in/out support */}
        <div className="relative">
          <AnimatePresence mode="wait">
            
            {activeTab === "interactive" && (
              <motion.div
                key="interactive-terminal"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-brand-pink-950/15 border-2 border-brand-pink-500/25 rounded-3xl p-4 sm:p-6 backdrop-blur-md pink-glow-sm"
              >
                {/* Candle Chart Panel */}
                <div className="lg:col-span-8 flex flex-col h-[350px] sm:h-[450px] justify-between relative">
                  <div className="flex items-center justify-between mb-4 bg-black/30 p-2.5 rounded-xl border border-brand-pink-500/10 text-left">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-pink-500 animate-pulse" />
                      <span className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-white">
                        PEPPY/WETH • ROBINHOOD SWAP
                      </span>
                    </div>
                    {/* Timeframe controls */}
                    <div className="flex gap-1.5">
                      {(["1m", "5m", "15m", "1h"] as const).map(tf => (
                        <button
                          key={tf}
                          onClick={() => setTimeframe(tf)}
                          className={`px-2 py-1 rounded text-[10px] sm:text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
                            timeframe === tf
                              ? "bg-brand-pink-600 text-white font-extrabold"
                              : "bg-black/40 text-brand-pink-400 hover:bg-brand-pink-500/10"
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Candle Chart display */}
                  <div className="flex-grow w-full relative min-h-[180px] sm:min-h-[220px] bg-black/25 rounded-2xl border border-brand-pink-500/5 p-4 flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                      {/* Grid Horizontal Guidelines */}
                      <line x1="0" y1="50" x2="800" y2="50" stroke="#f06595" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="3,3" />
                      <line x1="0" y1="125" x2="800" y2="125" stroke="#f06595" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="3,3" />
                      <line x1="0" y1="200" x2="800" y2="200" stroke="#f06595" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="3,3" />
                      <line x1="0" y1="275" x2="800" y2="275" stroke="#f06595" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="3,3" />

                      {candles.map((candle, idx) => {
                        // Calculate responsive coordinates
                        const candleWidth = 24;
                        const spacing = 15;
                        const totalWidth = candleWidth + spacing;
                        const x = 20 + idx * totalWidth;
                        
                        // Scale prices to visual box
                        const minVal = 0.000000800;
                        const maxVal = 0.000004800;
                        const valRange = maxVal - minVal;

                        const scaleY = (val: number) => {
                          const percent = (val - minVal) / valRange;
                          return 280 - (percent * 240);
                        };

                        const openY = scaleY(candle.open);
                        const closeY = scaleY(candle.close);
                        const highY = scaleY(candle.high);
                        const lowY = scaleY(candle.low);

                        const isBullish = candle.close >= candle.open;
                        const strokeColor = isBullish ? "#4ade80" : "#ef4444";
                        const fillColor = isBullish ? "rgba(74, 222, 128, 0.45)" : "rgba(239, 68, 68, 0.45)";

                        return (
                          <g key={idx}>
                            {/* Wick */}
                            <line
                              x1={x + candleWidth / 2}
                              y1={highY}
                              x2={x + candleWidth / 2}
                              y2={lowY}
                              stroke={strokeColor}
                              strokeWidth="1.5"
                            />
                            {/* Candle Body */}
                            <rect
                              x={x}
                              y={Math.min(openY, closeY)}
                              width={candleWidth}
                              height={Math.max(Math.abs(closeY - openY), 4)}
                              fill={fillColor}
                              stroke={strokeColor}
                              strokeWidth="1"
                              rx="2"
                            />
                          </g>
                        );
                      })}
                    </svg>

                    {/* Chart Overlay Controls */}
                    <div className="absolute top-4 right-4 bg-brand-pink-950/70 text-brand-pink-300 border border-brand-pink-500/20 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 animate-pulse">
                      <Flame className="w-3.5 h-3.5 text-brand-pink-400" />
                      CHART BULLISH
                    </div>
                  </div>

                  {/* Quick interactive mock purchase trigger */}
                  <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 bg-black/45 p-4 rounded-2xl border border-brand-pink-500/10 text-left">
                    <div className="text-center sm:text-left">
                      <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-1">
                        <ShoppingBag className="w-4 h-4 text-brand-pink-400" />
                        Swap Sandbox Simulator
                      </h4>
                      <p className="text-xs text-brand-pink-200/50 mt-0.5">
                        Test the price impact of $PEPPY purchases live! Click buy to pump the chart.
                      </p>
                    </div>
                    <button
                      onClick={triggerMockBuy}
                      className="w-full sm:w-auto ml-auto px-6 py-3 bg-brand-pink-500 hover:bg-brand-pink-400 text-black font-extrabold text-sm rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg active:scale-95 cursor-pointer border-b-2 border-brand-pink-700"
                    >
                      PUMP 1 ETH BUY 🚀
                    </button>
                  </div>
                </div>

                {/* Live transaction Ledger panel */}
                <div className="lg:col-span-4 flex flex-col h-[350px] sm:h-[450px]">
                  <h3 className="font-display font-black text-xs sm:text-sm tracking-wider uppercase text-brand-pink-300 mb-3 bg-black/30 p-2.5 rounded-xl border border-brand-pink-500/10 text-left">
                    LIVE TRANSACTION LEDGER
                  </h3>

                  <div className="flex-grow bg-black/35 rounded-2xl border border-brand-pink-500/5 p-3 overflow-y-auto space-y-2 flex flex-col pr-1.5 scrollbar-thin scrollbar-thumb-brand-pink-500/25">
                    <AnimatePresence initial={false}>
                      {trades.map((trade) => (
                        <motion.div
                          key={trade.id}
                          initial={{ opacity: 0, x: 20, height: 0 }}
                          animate={{ opacity: 1, x: 0, height: "auto" }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          transition={{ type: "spring", stiffness: 100, damping: 15 }}
                          className="p-2.5 rounded-xl bg-black/40 border border-brand-pink-500/5 flex flex-col justify-between text-xs overflow-hidden text-left"
                        >
                          <div className="flex items-center justify-between font-medium">
                            <span className="font-mono text-brand-pink-200/50 text-[10px]">{trade.time}</span>
                            <span className={`font-black uppercase tracking-wider text-[10px] px-1.5 py-0.5 rounded ${
                              trade.type === "buy" ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
                            }`}>
                              {trade.type}
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-1">
                            <span className="font-mono text-brand-pink-100/90 font-bold max-w-[140px] truncate">
                              {trade.wallet}
                            </span>
                            <span className="font-mono font-extrabold text-white">
                              {trade.amountEth} ETH
                            </span>
                          </div>

                          <div className="flex items-center justify-between mt-1 text-[10px] text-brand-pink-300/60 font-medium">
                            <span>{trade.amountTokens} $PEPPY</span>
                            <span>${parseFloat(trade.priceUsd).toFixed(8)}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

              </motion.div>
            )}

            {activeTab === "embed" && (
              <motion.div
                key="embed-chart"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.4 }}
                className="w-full h-[400px] sm:h-[550px] rounded-3xl overflow-hidden border-2 border-brand-pink-500/25 bg-black/45 p-1 pink-glow-sm"
              >
                <div className="w-full h-full relative">
                  <iframe 
                    title="Dexscreener Chart"
                    src="https://dexscreener.com/arbitrum/0xbc0f1c30bd7c8d998064cf01815db4ca24cc920b?embed=1&theme=dark&trades=0" 
                    className="w-full h-full border-0 rounded-2xl"
                  />
                  
                  {/* Subtle info pill on top of iframe */}
                  <div className="absolute bottom-4 left-4 bg-black/90 text-brand-pink-300 text-xs px-3 py-1.5 rounded-full border border-brand-pink-500/20 shadow-lg pointer-events-none flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-brand-pink-500" />
                    Real pairs loading dynamically via Dexscreener
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
