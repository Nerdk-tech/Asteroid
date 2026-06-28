import React from 'react';
import { motion } from 'framer-motion';

function StatBox({ value, label }) {
  return (
    <div className="text-center p-5 rounded-2xl bg-card/60 border border-border/50 backdrop-blur-sm">
      <p className="font-space font-black text-3xl text-primary mb-1">{value}</p>
      <p className="text-xs text-muted-foreground leading-snug">{label}</p>
    </div>
  );
}

export default function StorySection() {
  return (
    <section id="story" className="relative py-28 sm:py-40 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-primary uppercase tracking-[0.25em] font-space font-semibold mb-4"
        >
          Chapter one
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-space font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground mb-16 leading-[0.92]"
        >
          Her story<span className="text-primary">.</span>
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Olivia "Liv" Perrotto (2010–2026) loved Tesla, SpaceX, anime and the night sky.
              Fifteen years old, from Williamsport, Pennsylvania. For five years she fought
              undifferentiated sarcoma. Along the way, she designed a Shiba Inu in a spacesuit
              and named it <span className="text-foreground font-semibold">ASTEROID</span>.
            </p>
            <p className="text-muted-foreground/60 text-sm leading-relaxed mb-8">
              The plush Liv designed, floating inside the Dragon capsule moments after the Polaris
              Dawn crew reached microgravity — September 10, 2024.
            </p>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/40 border border-border/40">
              <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-lg">✦</span>
              </div>
              <div>
                <p className="text-xs text-muted-foreground/60 font-mono">July 28, 2010 — Jan 14, 2026</p>
                <p className="text-sm font-space font-semibold text-foreground mt-0.5">Liv Perrotto</p>
                <p className="text-xs text-muted-foreground italic">"I am the designer of ASTEROID."</p>
              </div>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-2xl shadow-primary/5">
              <img
                src="https://asteroideth.io/images/liv-interview.jpg"
                alt="Liv Perrotto, designer of ASTEROID"
                className="w-full h-[420px] sm:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-xs text-muted-foreground/70 font-mono">In orbit — ASTEROID in zero gravity</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
          <StatBox value="5 years" label="Battling undifferentiated sarcoma — a rare, aggressive pediatric cancer" />
          <StatBox value="30 min" label="Jared Isaacman asked her to design a zero-g indicator. She handed him ASTEROID." />
          <StatBox value="10,000×" label="From late-2024 launch to the April 2026 peak — peak return for early holders" />
        </div>

        {/* Grid photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border/40"
        >
          <img
            src="https://asteroideth.io/images/asteroid-grid.jpg"
            alt="ASTEROID alongside SpaceX hardware"
            className="w-full h-[300px] sm:h-[420px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <p className="text-xs text-primary uppercase tracking-widest mb-2 font-space">Polaris Dawn · Mission I</p>
            <h3 className="font-space font-black text-2xl sm:text-4xl text-foreground leading-tight">
              From a teenager's notebook<br />to the Dragon's cabin.
            </h3>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl"
        >
          The Polaris Dawn crew — Jared Isaacman, Scott Poteet, Sarah Gillis, Anna Menon — carried
          Liv's plush on humanity's first commercial spacewalk. It has ridden every mission since.
        </motion.p>
      </div>
    </section>
  );
}