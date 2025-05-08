import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect({ setProvider, setAccount }) {
  const [connected, setConnected] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  async function connect() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setProvider(provider);
      setAccount(accounts[0]);
      setCurrentAddress(accounts[0]);
      setConnected(true);
    }
  }

  // 监听钱包地址变化，自动重置连接状态
  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = (accounts) => {
      if (connected && accounts[0] !== currentAddress) {
        setConnected(false);
        setAccount(null);
        setCurrentAddress(null);
      }
    };
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [connected, currentAddress, setAccount]);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gradient-to-r from-[#d7263d] via-[#fcb69f] to-[#ffecd2] shadow-lg z-[1000]">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-8">
        <div className="flex items-center space-x-3 select-none">
          <span className="text-2xl font-extrabold text-[#d7263d] drop-shadow-sm tracking-wide">Proof of Growth</span>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            onClick={connect}
            style={connected ? { backgroundColor: '#d7263d', color: '#fff', borderColor: '#d7263d' } : { backgroundColor: '#fff', color: '#d7263d', borderColor: '#d7263d' }}
            className={
              'relative font-semibold text-lg rounded-xl px-8 py-2 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#d7263d] focus:ring-offset-2 border-2' +
              (connected
                ? ' hover:bg-[#b71c2b] active:bg-[#b71c2b]'
                : ' hover:bg-[#ffe3e3] active:scale-95')
            }
            disabled={connected}
          >
            {connected ? "已连接钱包" : "连接钱包"}
          </button>
        </div>
      </div>
    </nav>
  );
}