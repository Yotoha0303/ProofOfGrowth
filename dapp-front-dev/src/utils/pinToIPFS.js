// utils/pinToIPFS.js
export async function uploadToPinata(file) {
  const JWT = import.meta.env.VITE_PINATA_JWT;

  if (!JWT) throw new Error("未配置 Pinata JWT");

  const formData = new FormData();
  formData.append("file", file);

  formData.append(
    "pinataMetadata",
    JSON.stringify({
      name: file.name,
    })
  );

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`上传失败: ${data?.error || "未知错误"}`);
  }

  return `ipfs://${data.IpfsHash}`;
}
