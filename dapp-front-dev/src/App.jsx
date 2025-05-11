import { useState, useEffect } from "react";
import WalletConnect from "./components/WalletConnect";
import MintRecord from "./components/MintRecord";
import RecordList from "./components/RecordList";
import { getContract } from "./hooks/useContract";
import MintForm from "./components/MintForm";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (provider && account) {
      (async () => {
        const signer = await provider.getSigner();
        setSigner(signer);
        const contract = getContract(signer);
        setContract(contract);
        const owner = await contract.owner();
        setIsOwner(owner.toLowerCase() === account.toLowerCase());
      })();
    }
  }, [provider, account]);

  return (
    <>
      <WalletConnect setProvider={setProvider} setAccount={setAccount} />
      {/* 整体背景渐变 */}
      <div className="min-h-screen w-full flex flex-col items-center justify-start pt-20 bg-gradient-to-br from-[#fff6f0] via-[#ffe3e3] to-[#fcb69f]">
        {/* 内容卡片区 */}
        <div className="min-h-screen w-full flex flex-col items-center justify-start pt-20 bg-gradient-to-br from-[#fff6f0] via-[#ffe3e3] to-[#fcb69f]">
          {/* 标题区 */}
          <div className="w-full max-w-3xl text-center mb-8 bg-white/90 rounded-2xl shadow-2xl py-8 px-4 backdrop-blur-sm">
            <h1 className="text-[#d7263d] text-4xl md:text-5xl font-extrabold tracking-wide m-0 drop-shadow-[1px_2px_8px_#fff]">
              Proof of Growth
            </h1>
          </div>
          {/* 内容区 */}
          <div className="w-full max-w-3xl flex flex-col gap-8">
            {isOwner && signer && (
              <div className="bg-white/90 rounded-xl shadow-lg p-6">
                {/* <MintRecord signer={signer} /> */}
                <MintForm contract={contract} account={account} />
              </div>
            )}
            <div className="bg-white/90 rounded-xl shadow-lg p-6">
              <RecordList signer={signer} account={account} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;