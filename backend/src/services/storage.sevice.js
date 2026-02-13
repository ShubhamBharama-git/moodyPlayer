const ImageKit = require("@imagekit/nodejs").default;

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (file) => {
    if (!file) throw new Error("No file provided");

    try {
        const res = await imagekit.files.upload({
            file: file.buffer,
            fileName: file.originalname,
            folder: "/songs",
            useUniqueFileName: true,
        });

        console.log("Uploaded:", res);
        return res;

    } 
    catch (err) {
        console.error("ImageKit Upload Error:", err.message);
        throw err;
    }
};

module.exports = uploadFile;
