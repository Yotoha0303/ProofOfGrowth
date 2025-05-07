// src/App.jsx
import { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect";
import MintRecord from "./components/MintRecord";
import RecordList from "./components/RecordList";
import { getContract } from "./hooks/useContract";
import { ethers } from "ethers";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (provider && account) {
      (async () => {
        const signer = await provider.getSigner();
        setSigner(signer);
        const contract = getContract(signer);
        const owner = await contract.owner();
        setIsOwner(owner.toLowerCase() === account.toLowerCase());
      })();
    }
  }, [provider, account]);

  return (
    <>
    <WalletConnect setProvider={setProvider} setAccount={setAccount} />
    <div className="p-4"
    style={{
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: "50px", // 导航栏高度+间距
      boxSizing: "border-box",
      background: "#fff6f0"
    }}>
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginBottom: "32px",
          background: "linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%)",
          borderRadius: "16px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          padding: "24px 0"
        }}
      >
        <h1
          style={{
            color: "#d7263d",
            fontSize: "2.8rem",
            fontWeight: "bold",
            letterSpacing: "2px",
            margin: 0,
            textShadow: "1px 2px 8px #fff, 0 2px 8px #fcb69f"
          }}
        >
          Proof of Growth
        </h1>
      </div>
      {isOwner && signer && <MintRecord signer={signer} />}
      {signer && <RecordList signer={signer} account={account} />}
    </div>
    </>
  );
}

export default App;
