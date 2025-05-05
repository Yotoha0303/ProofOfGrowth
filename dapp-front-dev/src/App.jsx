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
    <div className="p-4">
      <h1>📚 Proof of Growth</h1>
      <WalletConnect setProvider={setProvider} setAccount={setAccount} />
      {isOwner && signer && <MintRecord signer={signer} />}
      {signer && <RecordList signer={signer} account={account} />}
    </div>
  );
}

export default App;
