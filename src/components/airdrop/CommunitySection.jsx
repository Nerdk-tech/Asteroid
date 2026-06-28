import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const links = [
  { title: 'Official X', handle: '@Asteroidcto', url: 'https://x.com/Asteroidcto', tag: 'X / Twitter' },
  { title: 'Telegram · Global · EN', handle: 'AsteroidShibaCTO', url: 'https://t.me/AsteroidShibaCTO', tag: 'Telegram' },
  { title: 'Telegram · 中文', handle: 'ASTEROID_SHIBA_Chinese', url: 'https://t.me/ASTEROID_SHIBA_Chinese', tag: 'Telegram' },
  { title: "Liv's story", handle: 'Glenn Beck · 2026', url: 'https://glennbeck.com/read/articles/cancer-tried-to-steal-my-daughters-space-dreams-elon-musk-and-jared-isaacman-gave-them-back', tag: 'Read' },
];

export default function CommunitySection() {
  return (
    <section id="community" className="relative py-28 sm:py-40 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-xs text-primary uppercase tracking-[0.25em] font-space font-semibold mb-4">Crew</p>
          <h2 className="font-space font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-[0.92]">
            Strap in<span className="text-primary">.</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mt-6 max-w-xl leading-relaxed">
            Every holder rides with Liv. Follow along, share the story, bring your friends —
            and when you look up, remember: her dream is everyone's dream now.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {links.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.url}
              target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
            >
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-2 font-space">{link.tag}</p>
              <p className="font-space font-bold text-sm text-foreground group-hover:text-primary transition-colors mb-1">{link.title}</p>
              <p className="text-xs text-muted-foreground mb-4">{link.handle}</p>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-primary transition-colors" />
            </motion.a>
          ))}
        </div>

        {/* Boxes photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border/40 mb-16"
        >
          <img
            src="https://asteroideth.io/images/asteroid-box.jpg"
            alt="ASTEROID plush boxes"
            className="w-full h-[260px] sm:h-[380px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/30 to-transparent mx-auto mb-10" />
          <blockquote className="font-space font-bold text-2xl sm:text-3xl text-foreground leading-tight">
            "I want ASTEROID to be for every child — so they look up and think, that's me. I can see my dreams, too."
          </blockquote>
          <p className="text-sm text-primary/70 mt-6 font-space">— Liv Perrotto</p>
        </motion.div>
      </div>
    </section>
  );
}