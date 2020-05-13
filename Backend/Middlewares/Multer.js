const multer = require("multer");
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpeg||jpg||png$/i)) {
      cb(new Error("This File Is Not Allowed", false));
      return;
    }
    cb(null, true);
  },
});
