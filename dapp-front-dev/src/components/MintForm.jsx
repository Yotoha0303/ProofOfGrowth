import { useState } from "react";
import { uploadToIPFS } from "../utils/uploadToIPFS";

export default function MintForm({ contract, account }) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [cate, setCate] = useState("");
    const [image, setImage] = useState(null); // 存储图片

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
        } else {
            alert("请选择一个有效的图片文件！");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !image) {
            alert("请上传图片！");
            return;
        }


        // 调用合约的 mintWithURI
        try {

            // 上传到 IPFS，返回 ipfs://CID 的 URL
            const ipfsURI = await uploadToIPFS({
                title,
                description: desc,
                category: cate,
                imageFile: image,
            });
            // const ipfsURI = await uploadToIPFSManual({
            //     title,
            //     desc,
            //     cate,
            //     imageFile: image,
            //     apiKey: import.meta.env.VITE_NFT_STORAGE_KEY,
            //   });
            // console.log("上传参数：", { title, desc, cate, image });


            const tx = await contract.mintWithURI(account, title, desc, cate, ipfsURI);
            await tx.wait();
            alert("铸造成功！");
        } catch (err) {
            console.error("合约调用失败：", err);
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
                <label className="mb-1 text-[#d7263d] font-semibold"></label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#fcb69f] file:text-[#d7263d] hover:file:bg-[#ffe3e3]"
                />
                {image && <span className="mt-1 text-green-600 text-sm">已选择：{image.name}</span>}
            </div>
            <button
                type="submit"
                className="w-full bg-[#d7263d] text-white font-bold py-3 rounded-lg shadow-md hover:bg-[#b71c2b] transition-colors duration-200 text-lg mt-2"
            >
                铸造 NFT
            </button>
        </form>
    );
}
