import { NFTStorage, File } from 'nft.storage';

const client = new NFTStorage({
    token: import.meta.env.VITE_NFT_STORAGE_KEY,
});

export async function uploadToIPFS({ title, description, category, imageFile }) {
    if (!import.meta.env.VITE_NFT_STORAGE_KEY) {
        throw new Error("❗ API Key 未设置，请检查 .env 文件");
      }
      

    try {
        const metadata = await client.store({
            name: title,
            description: `${description} - 分类:${category}`,
            image: new File([imageFile], imageFile.name, { type: imageFile.type }),
        });
        return metadata.url;
    } catch (e) {
        console.log(`图片上传错误！${e}`);
    }
    return null;
}
// export async function uploadToIPFSManual({ title, description, category, imageFile, apiKey }) {
//     const formData = new FormData();

//     const metadata = {
//         name: title,
//         description: `${description} - 分类:${category}`,
//     };

//     formData.append('meta', JSON.stringify(metadata));
//     formData.append('file', imageFile);

//     try {
//         const response = await fetch('/nft/upload', {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${apiKey}`,
//             },
//             body: imageFile,
//         });
//         if (!response.ok) {
//             const errText = await response.text();
//             throw new Error(`Upload failed: ${response.status} - ${errText}`);
//         }

//         const json = await response.json();
//         return `ipfs://${json.value.cid}`;
//     } catch (e) {
//         console.log(`图片上传错误！${e}`)
//     }

//     return null;
// }

