import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { useWallet } from '@/lib/useWallet';
import Starfield from '@/components/airdrop/Starfield';
import Navbar from '@/components/airdrop/Navbar';
import HeroSection from '@/components/airdrop/HeroSection';
import StorySection from '@/components/airdrop/StorySection';
import TheNoteSection from '@/components/airdrop/TheNoteSection';
import AirdropSection from '@/components/airdrop/AirdropSection';
import TokenSection from '@/components/airdrop/TokenSection';
import TeamSection from '@/components/airdrop/TeamSection';
import IPOSection from '@/components/airdrop/IPOSection';
import CommunitySection from '@/components/airdrop/CommunitySection';
import Footer from '@/components/airdrop/Footer';

export default function Home() {
  const { walletAddress, error, isEthereum, connect, disconnect, switchToEthereum } = useWallet();

  const handleConnect = async () => {
    await connect();
  };

  const handleDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected');
  };

  useEffect(() => {
    if (walletAddress && !isEthereum) {
      toast.warning('Please switch to Ethereum Mainnet', {
        action: { label: 'Switch', onClick: switchToEthereum },
      });
    }
  }, [walletAddress, isEthereum]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden font-inter">
      <Starfield />
      <Navbar walletAddress={walletAddress} onConnect={handleConnect} onDisconnect={handleDisconnect} />
      <HeroSection onConnect={handleConnect} />
      <StorySection />
      <TheNoteSection />
      <AirdropSection walletAddress={walletAddress} onConnect={handleConnect} />
      <TokenSection />
      <TeamSection />
      <IPOSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}