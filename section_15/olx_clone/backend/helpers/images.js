const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";
    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("items")) {
      folder = "items";
    }

    if (!folder) {
      return cb(new Error("Unrecognized request origin."));
    }

    cb(null, `public/images/${folder}`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname));
  }
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Please upload an image. Accepted formats: .png, .jpg, .jpeg"));
    }
    cb(undefined, true);
  }
})

module.exports = { imageUpload };