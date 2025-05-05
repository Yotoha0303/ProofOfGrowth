// src/components/MintRecord.jsx
import { useState } from "react";
import { getContract } from "../hooks/useContract";

export default function MintRecord({ signer }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    to: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function mint() {
    const contract = getContract(signer);
    const tx = await contract.mint(
      form.to,
      form.title,
      form.description,
      form.category
    );
    await tx.wait();
    alert("Minted!");
  }

  return (
    <div className="mt-4 border p-4">
      <h2>✏️ Mint New Growth Record</h2>
      <input name="to" placeholder="Recipient address" onChange={handleChange} />
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <button onClick={mint}>Mint</button>
    </div>
  );
}
