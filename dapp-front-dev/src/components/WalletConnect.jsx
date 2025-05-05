// src/components/WalletConnect.jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect({ setProvider, setAccount }) {
  const [connected, setConnected] = useState(false);

  async function connect() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setProvider(provider);
      setAccount(accounts[0]);
      setConnected(true);
    }
  }

  return (
    <button onClick={connect}>
      {connected ? "Wallet Connected" : "Connect Wallet"}
    </button>
  );
}
