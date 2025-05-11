import { useState } from "react";
import { uploadToPinata } from "../utils/pinToIPFS";

export default function MintForm({ contract, account }) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [cate, setCate] = useState("");
    const [ipfsUrl, setIpfsUrl] = useState(""); // 上传后获得的 IPFS 链接
    const [uploading, setUploading] = useState(false);

    // 选择图片时，先上传到 IPFS
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("请选择一个有效的图片文件！");
            return;
        }
        setUploading(true);
        try {
            const url = await uploadToPinata(file);
            setIpfsUrl(url);
            console.log("文件已上传:", url);
        } catch (err) {
            alert("图片上传失败: " + err.message);
            setIpfsUrl("");
        }
        setUploading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !ipfsUrl) {
            alert("请填写标题并上传图片！");
            return;
        }
        try {
            const tx = await contract.mintWithURI(account, title, desc, cate, ipfsUrl);
            await tx.wait();
            alert("铸造成功！");
            // 重置表单
            setTitle("");
            setDesc("");
            setCate("");
            setIpfsUrl("");
        } catch (err) {
            console.error("合约调用失败：", err);
            alert("合约调用失败: " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/90 rounded-2xl shadow-xl p-8 w-full max-w-lg mx-auto flex flex-col items-center">
            <h2 className="text-2xl font-bold text-[#d7263d] mb-2">铸造新的成长记录</h2>
            <input
                className="w-full rounded-lg border border-[#fcb69f] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d7263d] text-lg shadow-sm"
                placeholder="标题"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                className="w-full rounded-lg border border-[#fcb69f] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d7263d] text-lg shadow-sm"
                placeholder="描述"
                value={desc}
                onChange={e => setDesc(e.target.value)}
            />
            <input
                className="w-full rounded-lg border border-[#fcb69f] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d7263d] text-lg shadow-sm"
                placeholder="类别"
                value={cate}
                onChange={e => setCate(e.target.value)}
            />
            <div className="w-full flex flex-col items-start">
                <label className="mb-1 text-[#d7263d] font-semibold">上传图片</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#fcb69f] file:text-[#d7263d] hover:file:bg-[#ffe3e3]"
                    disabled={uploading}
                />
                {uploading && <span className="mt-1 text-yellow-600 text-sm">图片上传中...</span>}
                {ipfsUrl && <span className="mt-1 text-green-600 text-sm">已上传：{ipfsUrl}</span>}
            </div>
            <button
                type="submit"
                className="w-full bg-[#d7263d] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#b71c2b] transition-colors duration-200 text-lg mt-2"
                disabled={uploading}
            >
                铸造 NFT
            </button>
        </form>
    );
}
