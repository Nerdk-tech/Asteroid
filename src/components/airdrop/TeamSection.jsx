import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const timeline = [
  {
    period: '2024 · Q4',
    title: 'Joined day three',
    desc: 'First movers on the ASTEROID Shiba contract, right as Polaris Dawn\'s zero-g plush went viral.',
  },
  {
    period: '2024 · Q4',
    title: '2.1B donated to St. Jude',
    desc: 'Transferred on-chain, publicly verifiable. No marketing fund carve-out, no revesting.',
  },
  {
    period: '2025',
    title: 'LP locked, contract renounced',
    desc: 'Liquidity permanently locked; ownership renounced. Multiple third-party audits, zero findings.',
  },
  {
    period: 'April 17, 2026',
    title: 'Elon replies. The world notices.',
    desc: 'Musk\'s "Ok 🫡" to Liv\'s eighth question sent the token on a 45,000%+ 72-hour move, pushing market cap past $150M.',
    highlight: true,
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="relative py-28 sm:py-40 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-xs text-primary uppercase tracking-[0.25em] font-space font-semibold mb-4">The team</p>
          <h2 className="font-space font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-[0.92]">
            Two years.<br />No rugs<span className="text-primary">.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              $ASTEROID launched quietly in late 2024 and was taken over by the community within its first
              days. Narrative lead{' '}
              <a href="https://x.com/jhaninvest" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@jhaninvest</a>,
              on-chain operations by{' '}
              <a href="https://x.com/peterfeng168" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@peterfeng168</a>,
              backed by dedicated Chinese and Vietnamese community cells — together they have been shipping ever since.
            </p>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/15">
              <p className="text-xs text-primary/60 uppercase tracking-widest mb-3 font-space">Community takeover · within days of launch</p>
              <blockquote className="text-sm text-foreground italic leading-relaxed">
                "I handled narrative and promotion. @peterfeng168 lifted the donations on his shoulders."
              </blockquote>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mt-6">
              Two roles, one playbook, spanning three languages: narrative tells the story loud enough for the world to hear;
              on-chain ops move tokens silently where they matter; the Chinese and Vietnamese cells carry both into their
              own markets, 24/7. No pre-sales. No team unlocks. No retroactive tax. Just a thread, a contract, and receipts on Etherscan.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-card/50 border border-border/40 text-center">
                <p className="font-space font-black text-3xl text-primary">10,000×</p>
                <p className="text-xs text-muted-foreground mt-1">Peak return from launch to April 2026</p>
              </div>
              <div className="p-4 rounded-xl bg-card/50 border border-border/40 text-center">
                <p className="font-space font-black text-3xl text-green-400">2.1B</p>
                <p className="text-xs text-muted-foreground mt-1">$ASTEROID donated to St. Jude · peaked ~$1M USD</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-4">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative pl-8 pb-8 ${i < timeline.length - 1 ? 'border-l border-border/30' : ''}`}
              >
                <div className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full ${item.highlight ? 'bg-primary ring-4 ring-primary/20' : 'bg-border'}`} />
                <p className={`text-[10px] uppercase tracking-widest font-space mb-1 ${item.highlight ? 'text-primary' : 'text-muted-foreground/50'}`}>
                  {item.period}
                </p>
                <h4 className={`font-space font-bold text-base mb-1 ${item.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Principle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-border/40 bg-card/40 p-8 sm:p-12 text-center"
        >
          <p className="text-xs text-muted-foreground/50 uppercase tracking-widest mb-4 font-space">Operating principle</p>
          <h3 className="font-space font-black text-2xl sm:text-4xl text-foreground leading-tight">
            Only consistent building<br />earns the market's trust.
          </h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mt-6 leading-relaxed">
            Attention is cheap; conviction is not. From day three of 2024 through the April 2026 breakout,
            we've been shipping every single week — public threads, on-chain donations, community calls, listing
            applications, this site. Hype cycles come and go. Markets only respect projects that keep building
            after the spotlight moves on — and that is the only edge we claim.
          </p>
        </motion.div>
      </div>
    </section>
  );
}