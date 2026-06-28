import { useState, useEffect, useCallback } from 'react';

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [error, setError] = useState(null);

  const getProvider = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      return window.ethereum;
    }
    return null;
  };

  const connect = useCallback(async () => {
    const provider = getProvider();
    if (!provider) {
      setError('No EVM wallet detected. Please install MetaMask or another Web3 wallet.');
      return;
    }

    setError(null);
    const accounts = await provider.request({ method: 'eth_requestAccounts' });
    if (accounts && accounts.length > 0) {
      setWalletAddress(accounts[0]);
    }

    const chain = await provider.request({ method: 'eth_chainId' });
    setChainId(chain);
  }, []);

  const disconnect = useCallback(() => {
    setWalletAddress(null);
    setChainId(null);
    setError(null);
  }, []);

  const switchToEthereum = useCallback(async () => {
    const provider = getProvider();
    if (!provider) return;

    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x1' }],
    });
  }, []);

  // Listen for account/chain changes
  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setWalletAddress(null);
      } else {
        setWalletAddress(accounts[0]);
      }
    };

    const handleChainChanged = (chain) => {
      setChainId(chain);
    };

    provider.on('accountsChanged', handleAccountsChanged);
    provider.on('chainChanged', handleChainChanged);

    // Check if already connected
    provider.request({ method: 'eth_accounts' }).then((accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        provider.request({ method: 'eth_chainId' }).then(setChainId);
      }
    });

    return () => {
      provider.removeListener('accountsChanged', handleAccountsChanged);
      provider.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  return {
    walletAddress,
    chainId,
    error,
    isEthereum: chainId === '0x1',
    connect,
    disconnect,
    switchToEthereum,
  };
}