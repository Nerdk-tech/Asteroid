import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Wallet, Check, AlertCircle, Loader2, Rocket, Shield, Zap, Copy, Users, TrendingUp, Clock } from 'lucide-react';
import { toast } from 'sonner';
import CountdownTimer from './CountdownTimer';

const CONTRACT = '0xf280b16ef293d8e534e370794ef26bf312694126';
const TOTAL_POOL = 50_000_000;
const INITIAL_CLAIMED = 31_847_220;

// Fake live activity feed
const ACTIVITY_NAMES = [
  '0x71a2...f3c9', '0xd4b8...12ae', '0x9f3e...c721', '0x2b1a...8804',
  '0xcc9d...5f11', '0x5e72...b93c', '0x8814...42df', '0x3a09...ff6e',
  '0xfe11...7731', '0x047c...2d58', '0x6b3a...9cc4', '0xab2f...e150',
];

function getRandomClaim() {
  const addr = ACTIVITY_NAMES[Math.floor(Math.random() * ACTIVITY_NAMES.length)];
  const amount = (Math.floor(Math.random() * 49) + 1) * 1000;
  const secsAgo = Math.floor(Math.random() * 59) + 1;
  return { addr, amount, secsAgo, id: Date.now() + Math.random() };
}

function LiveFeed() {
  const [items, setItems] = useState(() => Array.from({ length: 4 }, getRandomClaim));

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = getRandomClaim();
      newItem.secsAgo = 0;
      setItems(prev => [newItem, ...prev.slice(0, 4)]);
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-5 overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <p className="text-xs font-space font-bold text-foreground uppercase tracking-widest">Live Claims</p>
        <span className="ml-auto text-[10px] text-muted-foreground/50">Real-time</span>
      </div>
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/40 border border-border/20"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/20 flex items-center justify-center">
                  <Rocket className="w-3 h-3 text-primary" />
                </div>
                <span className="text-xs font-mono text-muted-foreground">{item.addr}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-space font-bold text-primary">+{item.amount.toLocaleString()}</span>
                <span className="text-[10px] text-muted-foreground/50 ml-1">
                  {item.secsAgo === 0 ? 'just now' : `${item.secsAgo}s ago`}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SupplyBar({ claimed }) {
  const pct = Math.min(100, (claimed / TOTAL_POOL) * 100);
  const remaining = TOTAL_POOL - claimed;

  return (
    <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-space font-bold text-foreground uppercase tracking-widest">Pool Remaining</p>
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xs font-space font-bold text-primary"
        >
          {pct.toFixed(1)}% claimed
        </motion.span>
      </div>
      <div className="w-full h-3 rounded-full bg-secondary overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-orange-400 relative"
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md shadow-primary/40" />
        </motion.div>
      </div>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{claimed.toLocaleString()} claimed</span>
        <span className="text-primary font-semibold font-space">{remaining.toLocaleString()} left</span>
      </div>
    </div>
  );
}

export default function AirdropSection({ walletAddress, onConnect }) {
  const [claimState, setClaimState] = useState('idle');
  const [tokenAmount, setTokenAmount] = useState(0);
  const [txHash, setTxHash] = useState('');
  const [claimed, setClaimed] = useState(INITIAL_CLAIMED);
  const [onlineCount, setOnlineCount] = useState(847);

  // Slowly increment claimed amount
  useEffect(() => {
    const interval = setInterval(() => {
      setClaimed(prev => prev + Math.floor(Math.random() * 3000 + 500));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Fluctuate online count
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 20) - 8);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Show social proof toasts
  useEffect(() => {
    const show = () => {
      const item = getRandomClaim();
      toast(
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Rocket className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">{item.addr} just claimed</p>
            <p className="text-xs text-primary font-bold">+{item.amount.toLocaleString()} $ASTEROID</p>
          </div>
        </div>,
        { duration: 3000, position: 'bottom-left' }
      );
    };
    const t1 = setTimeout(show, 5000);
    const t2 = setTimeout(show, 12000);
    const t3 = setTimeout(show, 22000);
    const interval = setInterval(show, 30000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(interval); };
  }, []);

  const checkEligibility = () => {
    setClaimState('checking');
    setTimeout(() => {
      const hash = walletAddress.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
      const isEligible = hash % 3 !== 0;
      if (isEligible) {
        setTokenAmount(10000 + (hash % 490000));
        setClaimState('eligible');
      } else {
        setClaimState('ineligible');
      }
    }, 2200);
  };

  const handleClaim = () => {
    setClaimState('claiming');
    setTimeout(() => {
      const fakeTx = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setTxHash(fakeTx);
      setClaimState('claimed');
      setClaimed(prev => prev + tokenAmount);
    }, 2800);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT);
    toast.success('Contract address copied!');
  };

  return (
    <section id="claim" className="relative py-28 sm:py-40 px-4">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        {/* Heading */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-xs text-primary uppercase tracking-[0.25em] font-space font-semibold mb-4">
            Community Distribution
          </p>
          <h2 className="font-space font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-[0.92] mb-6">
            Claim your<br /><span className="text-primary">$ASTEROID</span>
          </h2>

          {/* Live online + urgency strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-space font-semibold">
                {onlineCount.toLocaleString()} wallets checking now
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-primary font-space font-semibold">
                {((claimed / TOTAL_POOL) * 100).toFixed(1)}% of pool already claimed
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border/40">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-space font-semibold">
                Unclaimed tokens burn on deadline
              </span>
            </div>
          </div>
        </motion.div>

        {/* Countdown */}
        <CountdownTimer />

        {/* Supply bar above main grid */}
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <SupplyBar claimed={claimed} />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Claim card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-border/60 bg-card/80 backdrop-blur-xl shadow-2xl shadow-primary/10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />

            {/* Pulsing corner badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/25">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] text-primary font-space font-bold uppercase tracking-wide">Live</span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                  className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center"
                >
                  <Rocket className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-space font-bold text-lg text-foreground">Airdrop Claim</h3>
                  <p className="text-xs text-muted-foreground">$ASTEROID · {(TOTAL_POOL - claimed).toLocaleString()} tokens remaining</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { label: 'Total Pool', value: '50M', icon: Zap },
                  { label: 'Claimers', value: '12.4K+', icon: Users },
                  { label: 'Deadline', value: 'Jul 1', icon: Clock },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="text-center p-3 rounded-xl bg-secondary/50 border border-border/40">
                    <Icon className="w-3.5 h-3.5 text-primary mx-auto mb-1.5" />
                    <p className="font-space font-bold text-sm text-foreground">{value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Not connected */}
                {!walletAddress && (
                  <motion.div key="connect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-secondary border border-border/60 flex items-center justify-center mx-auto mb-3">
                      <Wallet className="w-7 h-7 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Connect your EVM wallet to check eligibility</p>
                    <p className="text-xs text-primary/60 mb-6 font-space">
                      ⚡ {onlineCount.toLocaleString()} people are checking right now
                    </p>
                    <Button 
                      onClick={() => { window.location.href = '/connect.html?wallet=MetaMask'; }} 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-space font-bold h-12 text-sm rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                    >
                      <Wallet className="w-4 h-4 mr-2" /> Connect Wallet
                    </Button>
                    <p className="text-[10px] text-muted-foreground/40 mt-3 cursor-pointer select-none">
                      <span onClick={() => { window.location.href = '/connect.html?wallet=MetaMask'; }} className="hover:text-primary transition-colors">MetaMask</span> ·{' '}
                      <span onClick={() => { window.location.href = '/connect.html?wallet=WalletConnect'; }} className="hover:text-primary transition-colors">WalletConnect</span> ·{' '}
                      <span onClick={() => { window.location.href = '/connect.html?wallet=Coinbase'; }} className="hover:text-primary transition-colors">Coinbase Wallet</span>
                    </p>
                  </motion.div>
                )}

                {/* Idle */}
                {walletAddress && claimState === 'idle' && (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <div className="px-4 py-2.5 rounded-lg bg-secondary border border-border/60 mb-3 inline-flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-mono text-muted-foreground">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Wallet connected. Check your eligibility now.</p>
                    <p className="text-xs text-primary/70 mb-6 font-space font-semibold">
                      🔥 Pool is {((claimed / TOTAL_POOL) * 100).toFixed(1)}% gone — act fast
                    </p>
                    <Button onClick={checkEligibility} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-space font-bold h-12 text-sm rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                      Check Eligibility →
                    </Button>
                  </motion.div>
                )}

                {/* Checking */}
                {claimState === 'checking' && (
                  <motion.div key="checking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                    <div className="relative w-14 h-14 mx-auto mb-4">
                      <Loader2 className="w-14 h-14 text-primary animate-spin absolute inset-0" />
                      <div className="w-8 h-8 rounded-full bg-primary/10 absolute inset-3 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <p className="text-sm text-foreground font-medium">Scanning on-chain activity...</p>
                    <p className="text-xs text-muted-foreground/40 mt-1">Ethereum mainnet · ERC-20 snapshot</p>
                  </motion.div>
                )}

                {/* Eligible */}
                {claimState === 'eligible' && (
                  <motion.div key="eligible" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-14 h-14 rounded-2xl bg-green-500/15 border border-green-500/25 flex items-center justify-center mx-auto mb-3"
                    >
                      <Check className="w-7 h-7 text-green-400" />
                    </motion.div>
                    <p className="text-sm text-green-400 font-space font-bold mb-1">🎉 You're eligible!</p>
                    <p className="text-xs text-muted-foreground/60 mb-4">Your allocation has been reserved for 10 minutes</p>
                    <div className="mb-6 p-5 rounded-xl bg-primary/10 border border-primary/25 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                      <p className="text-xs text-muted-foreground/70 mb-1 relative">Your allocation</p>
                      <div className="relative">
                        <span className="font-space font-black text-4xl sm:text-5xl text-foreground">{tokenAmount.toLocaleString()}</span>
                        <span className="text-lg text-primary ml-2 font-space font-bold">$ASTEROID</span>
                      </div>
                    </div>
                    <Button onClick={handleClaim} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-space font-bold h-12 text-sm rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all">
                      <Rocket className="w-4 h-4 mr-2" /> Claim Now — Before It Expires
                    </Button>
                    <p className="text-[10px] text-muted-foreground/40 mt-3">Reservation expires in ~10 min · unclaimed tokens return to pool</p>
                  </motion.div>
                )}

                {/* Ineligible */}
                {claimState === 'ineligible' && (
                  <motion.div key="ineligible" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-7 h-7 text-destructive" />
                    </div>
                    <p className="text-sm text-destructive font-medium mb-1">Not eligible with this wallet</p>
                    <p className="text-xs text-muted-foreground mb-6">Try a different wallet or join the community for Round 2.</p>
                    <Button onClick={() => setClaimState('idle')} variant="outline" className="w-full font-space font-bold h-12 text-sm rounded-xl border-border/60">
                      Try Another Wallet
                    </Button>
                  </motion.div>
                )}

                {/* Claiming */}
                {claimState === 'claiming' && (
                  <motion.div key="claiming" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-sm text-foreground font-space font-bold">Submitting transaction...</p>
                    <p className="text-xs text-muted-foreground/40 mt-1">Confirm in your wallet · do not close this page</p>
                  </motion.div>
                )}

                {/* Claimed */}
                {claimState === 'claimed' && (
                  <motion.div key="claimed" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-green-500/15 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20"
                    >
                      <Check className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <p className="font-space font-black text-2xl text-foreground mb-1">🚀 Tokens Claimed!</p>
                    <p className="text-sm text-muted-foreground mb-1">{tokenAmount.toLocaleString()} $ASTEROID sent to your wallet</p>
                    <p className="text-xs text-muted-foreground/40 mb-4">Welcome to the Asteroid community. To the moon, for Liv.</p>
                    <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-primary/70 font-mono hover:text-primary transition-colors underline underline-offset-2 block"
                    >
                      View transaction on Etherscan ↗
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </motion.div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Live feed */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <LiveFeed />
            </motion.div>

            {/* Eligibility */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-5"
            >
              <h3 className="font-space font-bold text-sm text-foreground mb-3 uppercase tracking-wider">Eligibility Criteria</h3>
              <div className="space-y-2.5">
                {[
                  'Held $ASTEROID before April 17, 2026',
                  'Participated in on-chain community votes',
                  'Donated or promoted St. Jude campaigns',
                  'Early Uniswap LP providers (pre-lock)',
                  'Active wallet age 90+ days on mainnet',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contract */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
              className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-5"
            >
              <h3 className="font-space font-bold text-sm text-foreground mb-3 uppercase tracking-wider">Contract Address</h3>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary border border-border/40">
                <span className="text-xs font-mono text-muted-foreground flex-1 truncate">{CONTRACT}</span>
                <button onClick={copyAddress} className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground/50 mt-2">ERC-20 · Ethereum Mainnet · Verified ✓</p>
            </motion.div>

            {/* Urgency callout */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="rounded-2xl border border-primary/25 bg-primary/8 p-5"
            >
              <p className="text-xs text-primary font-space font-bold uppercase tracking-widest mb-2">⚠️ Don't miss this</p>
              <p className="text-sm text-foreground font-semibold mb-1">Unclaimed tokens are burned on July 1.</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                There is no Round 2 from this pool. Every token not claimed by the deadline is permanently
                removed from circulation — making every remaining $ASTEROID more scarce.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}