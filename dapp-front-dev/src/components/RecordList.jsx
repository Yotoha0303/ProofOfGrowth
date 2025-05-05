// src/components/RecordList.jsx
import { useEffect, useState } from "react";
import { getContract } from "../hooks/useContract";

export default function RecordList({ signer, account }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    (async () => {
      const contract = getContract(signer);
      const balance = await contract.balanceOf(account);
      const result = [];
      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(account, i);
        const record = await contract.getRecord(tokenId);
        result.push({ tokenId, ...record });
      }
      setRecords(result);
    })();
  }, [account, signer]);

  return (
    <div className="mt-4">
      <h2>📜 My Growth Records</h2>
      {records.map((rec, idx) => (
        <div key={idx} className="border p-2 mb-2">
          <p><strong>Title:</strong> {rec.title}</p>
          <p><strong>Description:</strong> {rec.description}</p>
          <p><strong>Category:</strong> {rec.category}</p>
          <p><strong>Timestamp:</strong> {new Date(rec.timestamp * 1000).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
