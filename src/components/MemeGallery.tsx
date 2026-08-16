import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, X, ZoomIn, Heart } from "lucide-react";

const PEPPY_MEMES = [
  "https://sf4service.site/raw/img_go0ub4g10.jpg",
  "https://sf4service.site/raw/img_bswqnnuku.jpg",
  "https://sf4service.site/raw/img_2zizew4nb.jpg",
  "https://sf4service.site/raw/img_i3fzvby6p.jpg",
  "https://sf4service.site/raw/img_n7wg0kvaq.jpg",
  "https://sf4service.site/raw/img_15f92bsx0.jpg",
  "https://sf4service.site/raw/img_1alm5grud.jpg"
];

export default function MemeGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likes, setLikes] = useState<{ [key: string]: number }>({});

  const handleLike = (e: React.MouseEvent, imgUrl: string) => {
    e.stopPropagation(); // Prevent opening lightbox
    setLikes(prev => ({
      ...prev,
      [imgUrl]: (prev[imgUrl] || 0) + 1
    }));
  };

  return (
    <section id="gallery" className="relative py-20 bg-black/40 border-y border-brand-pink-500/10 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-pink-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] rounded-full bg-brand-pink-600/5 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
        {/* Header Title */}
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink-950/60 border border-brand-pink-500/20 text-brand-pink-400 text-xs font-black uppercase tracking-wider mb-3">
            <ImageIcon className="w-3.5 h-3.5" />
            Peppy Meme Vault
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
            PEPPY <span className="text-brand-pink-500 pink-glow-text">CULTURE</span>
          </h2>
          <p className="max-w-xl text-brand-pink-200/80 text-sm sm:text-base mt-3 leading-relaxed">
            Witness the forming of a legendary community of meme chads. Pure unicorn-frog magic loaded with absolute, unfiltered culture.
          </p>
        </div>

        {/* Grid Setup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PEPPY_MEMES.map((imgUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedImage(imgUrl)}
              className="relative group aspect-square rounded-3xl bg-brand-pink-950/20 border-2 border-brand-pink-500/20 overflow-hidden cursor-pointer pink-glow-sm hover:border-brand-pink-500/60 transition-colors duration-300"
            >
              <img
                src={imgUrl}
                alt={`Peppy Meme ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-brand-pink-300 bg-black/50 px-2 py-1 rounded-lg border border-brand-pink-500/20">
                    Meme #{index + 1}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    {/* Interactive like button */}
                    <button
                      onClick={(e) => handleLike(e, imgUrl)}
                      className="p-1.5 rounded-lg bg-brand-pink-500/20 hover:bg-brand-pink-500 text-brand-pink-300 hover:text-black border border-brand-pink-500/40 transition-all duration-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-black">{likes[imgUrl] || index * 12 + 15}</span>
                    </button>

                    <span className="p-1.5 rounded-lg bg-black/60 text-brand-pink-300 border border-brand-pink-500/30">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-[999] backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-brand-pink-950/60 border border-brand-pink-500/30 text-brand-pink-400 hover:text-white hover:bg-brand-pink-500 transition-all cursor-pointer z-50 pink-glow-sm"
              aria-label="Close meme view"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden border-2 border-brand-pink-500 pink-glow"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Fullscreen Peppy Meme"
                className="w-full h-auto max-h-[85vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
