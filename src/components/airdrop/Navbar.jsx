import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ExternalLink, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'The note', href: '#note' },
  { label: 'Claim', href: '#claim' },
  { label: 'Token', href: '#token' },
  { label: 'Team', href: '#team' },
  { label: 'IPO', href: '#ipo' },
  { label: 'Community', href: '#community' },
];

export default function Navbar({ walletAddress, onConnect, onDisconnect }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const truncated = walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : null;

  return (
    <>
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 backdrop-blur-xl bg-background/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-primary/30 overflow-hidden">
              <img src="https://asteroideth.io/images/logo.jpg" alt="ASTEROID" className="w-full h-full object-cover" />
            </div>
            <span className="font-space font-bold text-base tracking-tight text-foreground">ASTEROID</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CA pill */}
            <a
              href="https://etherscan.io/token/0xf280b16ef293d8e534e370794ef26bf312694126"
              target="_blank" rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary border border-border/50 text-[10px] font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-primary/60">CA</span> 0xf280...4126
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            {walletAddress ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] font-mono text-green-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {truncated}
                </div>
                <Button variant="outline" size="sm" onClick={onDisconnect} className="text-xs border-border/50 h-8 px-3">
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={onConnect} size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-space font-bold text-xs px-5 h-9 rounded-full">
                Connect
              </Button>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground transition-colors ml-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl px-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </motion.nav>
    </>
  );
}