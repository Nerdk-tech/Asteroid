import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const links = [
    { label: 'Etherscan', url: 'https://etherscan.io/token/0xf280b16ef293d8e534e370794ef26bf312694126' },
    { label: 'Dexscreener', url: 'https://dexscreener.com/ethereum/0x76a411f14a704099ba476ce8dffc288a53295218' },
    { label: 'DexTools', url: 'https://www.dextools.io/app/en/ether/pair-explorer/0x76a411f14a704099ba476ce8dffc288a53295218' },
    { label: 'Uniswap', url: 'https://app.uniswap.org/swap?outputCurrency=0xf280b16ef293d8e534e370794ef26bf312694126&chain=ethereum' },
    { label: 'GeckoTerminal', url: 'https://www.geckoterminal.com/eth/pools/0x76a411f14a704099ba476ce8dffc288a53295218' },
  ];

  return (
    <footer className="border-t border-border/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
              <img src="https://asteroideth.io/images/logo.jpg" alt="ASTEROID" className="w-full h-full object-cover" />
            </div>
            <span className="font-space font-bold text-foreground">ASTEROID</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-primary transition-colors"
              >
                {link.label} <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-border/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/40 text-center sm:text-left">
            $ASTEROID · ERC-20 · Ethereum · Community-owned · LP burned · Ownership renounced
          </p>
          <p className="text-xs text-muted-foreground/30 text-center">
            Not financial advice. DYOR. In memory of Liv Perrotto (2010–2026).
          </p>
        </div>
      </div>
    </footer>
  );
}