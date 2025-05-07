import { useState } from 'react';
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
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0, // 关键：让导航栏从页面最左侧开始
        width: "100vw",
        height: "60px",
        background: "linear-gradient(90deg, #fcb69f 0%, #ffecd2 100%)",
        boxShadow: "0 2px 8px rgba(220, 38, 61, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        zIndex: 1000,
        paddingRight: "32px"
      }}
    >
      <button
        onClick={connect}
        style={{
          background: connected ? "#d7263d" : "#fff",
          color: connected ? "#fff" : "#d7263d",
          fontWeight: "bold",
          fontSize: "1rem",
          border: "none",
          borderRadius: "8px",
          padding: "10px 24px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(220, 38, 61, 0.08)",
          transition: "background 0.2s, color 0.2s"
        }}
      >
        {connected ? "Wallet Connected" : "Connect Wallet"}
      </button>
    </nav>
  );
}