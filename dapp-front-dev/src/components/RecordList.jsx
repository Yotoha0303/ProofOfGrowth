// src/components/RecordList.jsx
import { useEffect, useState } from "react";
import { getContract } from "../hooks/useContract";

export default function RecordList({ signer, account }) {
  const [records, setRecords] = useState([]);

  // 封装刷新记录的函数
  async function fetchRecords() {
    const contract = getContract(signer);
    const balance = await contract.balanceOf(account);
    const result = [];
    if (balance.toString() === "0") {
      setRecords([]);
      return;
    }
    for (let i = 0; i < balance; i++) {
      try {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const rawRecord = await contract.getRecord(tokenId);
        const record = {
          title: rawRecord[0],
          description: rawRecord[1],
          category: rawRecord[2],
          timestamp: Number(rawRecord[3])
        }
        result.push({ tokenId, ...record });
      } catch (error) {
        console.error("获取tokenId错误：", error);
      }
    }
    setRecords(result);
  }
  useEffect(() => {
    if (!account || !signer) return;
    fetchRecords();
  }, [account, signer]);

  // 加入图片版本（未完成）
  // async function fetchRecords() {
  //   try {
  //     const contract = getContract(signer);
  //     const balance = await contract.balanceOf(account);
  //     const result = [];

  //     for (let i = 0; i < balance; i++) {
  //       try {
  //         const tokenId = await contract.tokenOfOwnerByIndex(account, i);
  //         const rawRecord = await contract.getRecord(tokenId);
  //         const uri = await contract.getTokenURI(tokenId);

  //         const metadataURL = uri.replace("ipfs://", "https://ipfs.io/ipfs/");
  //         let metadata = {};
  //         try {
  //           const response = await fetch(metadataURL);
  //           // console.log(`response:${response.image}`)
  //           metadata = await response.json();
  //         } catch (e) {
  //           console.warn("IPFS metadata 获取失败：", e.message);
  //         }

  //         result.push({
  //           tokenId: tokenId.toString(),
  //           title: rawRecord[0],
  //           description: rawRecord[1],
  //           category: rawRecord[2],
  //           timestamp: Number(rawRecord[3]),
  //           image: metadata.image?.replace("ipfs://", "https://ipfs.io/ipfs/") || null,
  //         });
  //       } catch (err) {
  //         console.error(`第 ${i} 个 token 处理失败：`, err.message);
  //       }
  //     }

  //     setRecords(result);
  //   } catch (e) {
  //     console.error("获取合约数据失败：", e.message);
  //   }
  // }


  async function burnToken(tokenId) {
    if (!window.confirm("确定删除吗？")) return;
    try {
      const contract = getContract(signer);
      const tx = await contract.burn(tokenId);
      await tx.wait();
      alert("删除成功！");
      // 重新拉取数据
      fetchRecords();
    } catch (err) {
      alert("删除失败：" + (err?.reason || err?.message || err));
    }
  }

  return (
    <div
      className="mt-4"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "18px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "32px 24px",
        // 新增滚动相关样式
        maxHeight: "650px",      // 你可以根据需要调整高度
        overflowY: "auto",
        // 可选：让滚动条更美观
        scrollbarWidth: "thin",
        scrollbarColor: "#fcb69f #fff"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#d7263d",
          fontWeight: "bold",
          fontSize: "2rem",
          letterSpacing: "1px",
          marginBottom: "32px",
          textShadow: "1px 2px 8px #fff, 0 2px 8px #fcb69f"
        }}
      >
        📜 My Growth Records
      </h2>
      {records.length === 0 ? (
        <div style={{ textAlign: "center", color: "#aaa", fontSize: "1.1rem" }}>
          暂无成长记录
        </div>
      ) : (
        records.map((rec, idx) => (
          <div
            key={idx}
            style={{
              background: "linear-gradient(90deg, #fcb69f 0%, #ffecd2 100%)",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(220, 38, 61, 0.08)",
              padding: "20px 18px",
              marginBottom: "20px",
              borderLeft: "6px solid #d7263d",
              transition: "box-shadow 0.2s"
            }}
          >
            {/* 图片 */}
            {/* {rec.image && <img src={rec.image} alt={rec.title} className="w-full mb-2 rounded" />} */}
            {/* 标题 */}
            <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#d7263d" }}>
              {rec.title}
            </div>
            {/* 描述 */}
            <div style={{ color: "#333", margin: "8px 0 4px 0" }}>
              <span style={{ fontWeight: "bold" }}>描述：</span>
              {rec.description}
            </div>
            {/* 分类 */}
            <div style={{ color: "#555", marginBottom: "4px" }}>
              <span style={{ fontWeight: "bold" }}>分类：</span>
              {rec.category}
            </div>
            {/* 时间 */}
            <div style={{ color: "#888", fontSize: "0.95rem" }}>
              <span style={{ fontWeight: "bold" }}>时间：</span>
              {new Date(rec.timestamp * 1000).toLocaleString()}
            </div>
            <div style={{ color: "#bbb", fontSize: "0.85rem", marginTop: "6px" }}>
              Token ID: {rec.tokenId.toString()}
              <button
                style={{
                  marginLeft: "16px",
                  background: "#d7263d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 12px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  transition: "background 0.2s"
                }}
                onClick={() => burnToken(rec.tokenId)}
              >
                删除
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
