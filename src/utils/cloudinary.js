require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadFile = async (filePath, folder, nombre) => {
    return await cloudinary.uploader.upload(filePath,{
        folder: folder,
        public_id: nombre
    })
}

const deleteFile = async (publicId) => {
    return await cloudinary.uploader.destroy(publicId)
}

module.exports = { cloudinary, uploadFile, deleteFile }; 