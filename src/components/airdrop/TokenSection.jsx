import React from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CONTRACT = '0xf280b16ef293d8e534e370794ef26bf312694126';

const pieData = [
  { name: 'Circulating', value: 45, color: '#f97316' },
  { name: 'LP Burned', value: 35, color: '#ea580c' },
  { name: 'St. Jude Donation', value: 10, color: '#22c55e' },
  { name: 'Airdrop', value: 5, color: '#f59e0b' },
  { name: 'Ecosystem', value: 5, color: '#06b6d4' },
];

const links = [
  { label: 'Uniswap', url: 'https://app.uniswap.org/swap?outputCurrency=0xf280b16ef293d8e534e370794ef26bf312694126&chain=ethereum' },
  { label: 'Etherscan', url: 'https://etherscan.io/token/0xf280b16ef293d8e534e370794ef26bf312694126' },
  { label: 'Dexscreener', url: 'https://dexscreener.com/ethereum/0x76a411f14a704099ba476ce8dffc288a53295218' },
  { label: 'DexTools', url: 'https://www.dextools.io/app/en/ether/pair-explorer/0x76a411f14a704099ba476ce8dffc288a53295218' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs font-space font-semibold text-foreground">{payload[0].name}</p>
        <p className="text-xs text-primary font-bold">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function TokenSection() {
  const copyCA = () => {
    navigator.clipboard.writeText(CONTRACT);
    toast.success('Contract address copied!');
  };

  return (
    <section id="token" className="relative py-28 sm:py-40 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <p className="text-xs text-primary uppercase tracking-[0.25em] font-space font-semibold mb-4">The token</p>
          <h2 className="font-space font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-[0.92]">
            One coin.<br />One tribute<span className="text-primary">.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-center leading-relaxed mb-16"
        >
          $ASTEROID lives on Ethereum. Launched quietly in late 2024 and taken over by the community
          within its first days. No taxes. No team tokens. Liquidity burned. Just a memecoin carrying
          Liv's story across every block.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-8 items-center mb-10">
          {/* Pie chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-6"
          >
            <p className="font-space font-bold text-base text-foreground mb-6">Token Distribution</p>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  formatter={(val) => <span className="text-xs text-muted-foreground">{val}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Token info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="space-y-5"
          >
            {/* Logo + name */}
            <div className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl">
              <img src="https://asteroideth.io/images/logo.jpg" alt="ASTEROID" className="w-14 h-14 rounded-full border-2 border-primary/30 flex-shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-space font-bold text-lg text-foreground">$ASTEROID</p>
                  <span className="text-[10px] bg-green-500/15 text-green-400 border border-green-500/20 rounded-full px-2 py-0.5 font-space font-semibold">Verified</span>
                </div>
                <p className="text-xs text-muted-foreground">ASTEROID Shiba · Ethereum · ERC-20</p>
              </div>
            </div>

            {/* Contract */}
            <div className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl">
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-widest mb-2 font-space">Contract address</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground flex-1 break-all">{CONTRACT}</span>
                <button onClick={copyCA} className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Chain', value: 'Ethereum' },
                { label: 'Tax', value: '0 / 0' },
                { label: 'LP Status', value: 'Burned 🔥' },
                { label: 'Ownership', value: 'Renounced' },
              ].map((item) => (
                <div key={item.label} className="p-4 rounded-xl border border-border/40 bg-secondary/40 text-center">
                  <p className="font-space font-bold text-sm text-foreground">{item.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Market links */}
            <div className="grid grid-cols-2 gap-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-border/50 bg-secondary/40 text-xs font-space font-semibold text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                >
                  {link.label} <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Boxes photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-border/40"
        >
          <img
            src="https://asteroideth.io/images/asteroid-box.jpg"
            alt="ASTEROID plushes on pallets, ready to ship"
            className="w-full h-[280px] sm:h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <p className="font-space font-black text-2xl sm:text-4xl text-foreground leading-tight mb-2">The legacy</p>
            <p className="text-sm text-muted-foreground max-w-lg">
              LP permanently burned. Ownership renounced. Community-owned, fully on-chain from day one.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}