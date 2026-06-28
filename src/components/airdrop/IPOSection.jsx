import React from 'react';
import { motion } from 'framer-motion';

const tailwinds = [
  {
    label: 'Reported valuation',
    value: '$1.75T',
    desc: 'Roughly 3× the next-largest IPO in history (Saudi Aramco, 2019). Bigger than Meta, Tesla, or Alibaba at debut — combined.',
  },
  {
    label: 'Historical rank',
    value: '#1 ever',
    desc: 'The largest public offering of all time. Every financial front page in June 2026 will feature the rocket that ASTEROID calls home.',
  },
];

export default function IPOSection() {
  return (
    <section id="ipo" className="relative py-28 sm:py-40 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-xs text-primary uppercase tracking-[0.25em] font-space font-semibold mb-4">What happens next</p>
          <h2 className="font-space font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-[0.92]">
            ASTEROID rides<br />the biggest IPO ever<span className="text-primary">.</span>
          </h2>
        </motion.div>

        {/* Rocket photo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border/40 mb-12"
        >
          <img
            src="https://asteroideth.io/images/spacex-rocket.jpg"
            alt="SpaceX Falcon 9 on the pad"
            className="w-full h-[320px] sm:h-[500px] object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <p className="text-xs text-primary/70 uppercase tracking-widest mb-2 font-space">June 2026 · NYSE</p>
            <h3 className="font-space font-black text-3xl sm:text-5xl text-foreground leading-tight">
              The rocket that<br />ASTEROID rides on<br />goes public.
            </h3>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed mb-12"
        >
          SpaceX is expected to go public in June 2026 at a reported <span className="text-foreground font-semibold">~$1.75 trillion</span> valuation —
          the largest public offering in history, larger than every other tech IPO combined. Liv's Shiba Inu,
          now the mascot of every SpaceX launch, travels onto the most-watched cap table on Earth.
        </motion.p>

        {/* Stat blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {tailwinds.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-xl"
            >
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-2 font-space">{item.label}</p>
              <p className="font-space font-black text-4xl sm:text-5xl text-primary mb-3">{item.value}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tailwind card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-primary/5 border border-primary/15 p-8 sm:p-10"
        >
          <p className="text-xs text-primary/70 uppercase tracking-widest mb-3 font-space">Tailwind</p>
          <h3 className="font-space font-black text-2xl sm:text-3xl text-foreground mb-4">
            Retail's eyes snap back to space.
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            An IPO this size doesn't just move a ticker — it rewrites the narrative for an entire sector.
            Space stocks, space ETFs, space memes. And right at the center of the story is Liv's plush Shiba,
            already riding on every launch, already carrying the brand people will be Googling for months.
          </p>
        </motion.div>
      </div>
    </section>
  );
}