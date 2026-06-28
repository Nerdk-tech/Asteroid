import React from 'react';
import { motion } from 'framer-motion';

const questions = [
  { num: '01', text: 'Will Tesla Diner be in every city?' },
  { num: '02', text: "What's your favorite anime?" },
  { num: '03', text: 'Have you been to Japan?' },
  { num: '04', text: "What's the fastest Cybertruck?" },
  { num: '05', text: 'Will we make it to Mars by 2030?' },
  { num: '06', text: "Which rocket is your favorite?" },
  { num: '07', text: 'Can we meet one day?' },
  { num: '08', text: "Can ASTEROID be SpaceX's official mascot?" },
];

export default function TheNoteSection() {
  return (
    <section id="note" className="relative py-28 sm:py-40 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-primary uppercase tracking-[0.25em] font-space font-semibold mb-4"
        >
          Chapter two
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-space font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground mb-8 leading-[0.92]"
        >
          The note she left behind<span className="text-primary">.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-16"
        >
          Too weak to pick up the phone for the call Elon had scheduled, Liv wrote eight questions
          for him on a piece of paper and placed it on her bedside. After she passed, her mother
          shared the note on X. Glenn Beck read it live on air. Elon replied within minutes.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Notepad card */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -1 }}
            whileInView={{ opacity: 1, x: 0, rotate: -1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Label above */}
            <p className="text-xs text-muted-foreground/50 font-space mb-3 ml-1">For Elon · From Liv</p>

            {/* Tape pieces */}
            <div className="absolute -top-3 left-16 w-14 h-6 bg-[#d4956a]/60 rounded-sm rotate-[-2deg] z-20 shadow-sm" style={{backdropFilter:'none'}} />
            <div className="absolute -top-3 right-16 w-14 h-6 bg-[#d4956a]/60 rounded-sm rotate-[3deg] z-20 shadow-sm" />

            {/* Paper */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
              style={{ background: '#f5f0e8' }}
            >
              {/* Ruled lines */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 47px, #d6cfc4 47px, #d6cfc4 48px)',
                backgroundPositionY: '80px',
              }} />

              <div className="relative z-10 px-7 pt-8 pb-8">
                {/* Header */}
                <p className="font-caveat text-[#888070] text-lg mb-6 tracking-wide">8 questions</p>

                {/* Questions */}
                <div className="space-y-0">
                  {questions.map((q, i) => (
                    <motion.div
                      key={q.num}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className={`flex gap-4 items-start py-3 ${q.num === '08' ? 'rounded-lg px-2 -mx-2' : ''}`}
                      style={q.num === '08' ? { background: 'rgba(210,150,100,0.22)' } : {}}
                    >
                      <span className="font-caveat text-[#b0a090] text-lg flex-shrink-0 w-7 text-right leading-snug">{q.num}</span>
                      <p className="font-caveat text-[#1a1612] text-xl leading-snug">{q.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Signature */}
                <p className="font-caveat text-[#1a1612] text-xl mt-6 ml-1">— love, Liv</p>
              </div>
            </div>
          </motion.div>

          {/* Elon reply + stories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Elon reply */}
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6">
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-3 font-space">Elon's reply · April 17, 2026</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center font-bold text-sm text-foreground">E</div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Elon Musk</p>
                  <p className="text-xs text-muted-foreground/60">@elonmusk · replying to Glenn Beck</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm italic mb-3">"Will answer shortly."</p>
              <div className="border-t border-border/30 pt-4">
                <p className="text-xs text-primary/60 uppercase tracking-widest mb-1 font-space">Q8 —</p>
                <p className="text-2xl font-bold text-foreground">Ok 🫡</p>
              </div>
            </div>

            {/* All night story */}
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6">
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-2 font-space">October 2024 · Pittsburgh</p>
              <h3 className="font-space font-bold text-xl text-foreground mb-2">All night in line.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Liv stood in line all night at an Elon town hall just to ask him one question:{' '}
                <span className="text-foreground italic">"When will you start sending kids to space?"</span>{' '}
                She wanted to be the first.
              </p>
            </div>

            {/* Flowers */}
            <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6">
              <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-2 font-space">January 2026 · The final call</p>
              <h3 className="font-space font-bold text-xl text-foreground mb-2">Flowers, and a note.</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Elon arranged a phone call with her in her final days. She was too exhausted to speak.
                He sent flowers and a handwritten note instead. They were placed in her casket.
              </p>
            </div>

            {/* Jared */}
            <div className="rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-xl p-6">
              <p className="text-[10px] text-primary/60 uppercase tracking-widest mb-2 font-space">Jared Isaacman</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                He chartered planes for her treatment. Took her for a ride in a fighter jet, consulted
                with St. Jude, introduced her to astronaut Charlie Duke and William Shatner — and asked
                a 13-year-old to design a piece of space history.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Tesla photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 relative rounded-2xl overflow-hidden border border-border/40"
        >
          <img
            src="https://asteroideth.io/images/asteroid-tesla.jpg"
            alt="Liv with the ASTEROID plush"
            className="w-full h-[300px] sm:h-[450px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-10">
            <p className="font-space font-black text-2xl sm:text-4xl text-foreground leading-tight">
              Every mission,<br />from here to Mars.
            </p>
            <p className="text-sm text-muted-foreground mt-3 max-w-md">
              April 2026 — Elon made ASTEROID SpaceX's official mascot. Falcon 9, Dragon, Starship,
              Polaris, Artemis, and whatever comes next: Liv's creation rides with every crew, on every launch, forever.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}