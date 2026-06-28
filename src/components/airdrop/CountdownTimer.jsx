import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

const CLAIM_DEADLINE = new Date('2026-07-01T00:00:00Z').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(0, CLAIM_DEADLINE - now);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label, hot }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      setTimeout(() => { setFlip(false); setPrev(value); }, 300);
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className={`relative w-16 sm:w-20 h-16 sm:h-20 rounded-xl flex items-center justify-center overflow-hidden
        ${hot ? 'bg-primary/20 border-2 border-primary/50 shadow-lg shadow-primary/20' : 'bg-secondary/80 border border-border/60'}`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`font-space font-black text-2xl sm:text-3xl tabular-nums ${hot ? 'text-primary' : 'text-foreground'}`}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={`text-[10px] sm:text-xs mt-2 uppercase tracking-widest font-space ${hot ? 'text-primary/80' : 'text-muted-foreground/70'}`}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isUrgent = time.days < 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center mb-14"
    >
      {/* Urgency label */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
      >
        <Flame className="w-3.5 h-3.5 text-primary" />
        <p className="text-xs text-primary font-space font-bold uppercase tracking-widest">
          Claim Window Closes In
        </p>
        <Flame className="w-3.5 h-3.5 text-primary" />
      </motion.div>

      <div className="flex items-center gap-3 sm:gap-4">
        <TimeBlock value={time.days} label="Days" hot={isUrgent} />
        <span className="text-2xl text-muted-foreground/30 font-light pb-5">:</span>
        <TimeBlock value={time.hours} label="Hours" hot={isUrgent} />
        <span className="text-2xl text-muted-foreground/30 font-light pb-5">:</span>
        <TimeBlock value={time.minutes} label="Min" hot />
        <span className="text-2xl text-muted-foreground/30 font-light pb-5">:</span>
        <TimeBlock value={time.seconds} label="Sec" hot />
      </div>
    </motion.div>
  );
}