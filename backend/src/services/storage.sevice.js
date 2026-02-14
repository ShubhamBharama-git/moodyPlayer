const ImageKit = require("imagekit");
const mongoose = require("mongoose")


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (file) => {
    if (!file || !file.buffer) throw new Error("File buffer is missing");

    try {
        const result = await imagekit.upload({
            file: file.buffer,
            fileName: new mongoose.Types.ObjectId().toString(),
            folder: "/songs",
            useUniqueFileName: true,
        });

        return result;
    } catch (err) {
        console.error("ImageKit SDK Error Details:", err);
        throw err;
    }
};

module.exports = uploadFile;