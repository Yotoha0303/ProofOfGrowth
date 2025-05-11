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
    alert("铸造成功!");
  }

  return (
    <div
      className="mt-4"
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        background: "rgba(255,255,255,0.97)",
        borderRadius: "18px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "32px 24px",
        marginBottom: "32px"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#d7263d",
          fontWeight: "bold",
          fontSize: "2rem",
          letterSpacing: "1px",
          marginBottom: "28px",
          textShadow: "1px 2px 8px #fff, 0 2px 8px #fcb69f"
        }}
      >
        ✏️ Mint New Growth Record
      </h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px"
        }}
        onSubmit={e => {
          e.preventDefault();
          mint();
        }}
      >
        <input
          name="to"
          placeholder="Recipient address"
          onChange={handleChange}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #fcb69f",
            fontSize: "1rem"
          }}
        />
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #fcb69f",
            fontSize: "1rem"
          }}
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #fcb69f",
            fontSize: "1rem"
          }}
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #fcb69f",
            fontSize: "1rem"
          }}
        />
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #fcb69f 0%, #ffecd2 100%)",
            color: "#d7263d",
            fontWeight: "bold",
            fontSize: "1.1rem",
            border: "none",
            borderRadius: "8px",
            padding: "12px",
            marginTop: "8px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(220, 38, 61, 0.08)",
            transition: "background 0.2s"
          }}
        >
          Mint
        </button>
      </form>
    </div>
  );
}
