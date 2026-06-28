import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection({ onConnect }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16">
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/6 rounded-full blur-[180px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        {/* Floating logo */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-primary/30 shadow-2xl shadow-primary/20 mb-10 overflow-hidden"
        >
          <img src="https://asteroideth.io/images/logo.jpg" alt="ASTEROID" className="w-full h-full object-cover" />
        </motion.div>

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-space font-semibold text-primary tracking-widest uppercase">
            Airdrop Live — Claim Now
          </span>
        </motion.div>

        {/* Giant title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="font-space font-black text-[clamp(4rem,15vw,10rem)] tracking-[-0.04em] leading-[0.88] text-foreground mb-6"
        >
          ASTEROID<span className="text-primary">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-base sm:text-xl text-muted-foreground max-w-lg leading-relaxed mb-10"
        >
          A 15-year-old designed a Shiba Inu zero-g indicator for Polaris Dawn.
          Elon Musk made it SpaceX's official mascot. This is her token.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            onClick={onConnect}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-space font-bold px-8 h-12 text-sm rounded-full"
          >
            Claim Airdrop
          </Button>
          <a
            href="https://app.uniswap.org/swap?outputCurrency=0xf280b16ef293d8e534e370794ef26bf312694126&chain=ethereum"
            target="_blank" rel="noopener noreferrer"
          >
            <Button variant="outline" className="border-border/60 font-space font-semibold px-8 h-12 text-sm rounded-full hover:border-primary/40 w-full sm:w-auto">
              Buy on Uniswap <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-muted-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}