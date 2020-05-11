const Multer = require("multer");
const MIME_TYPE = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};
exports.fileUpload = Multer({
  limits: 500000,
  storage: Multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE[file.mimetype];
    const error = isValid ? null : new Error("Invalid Image Type");
    cb(error, isValid);
  },
});
