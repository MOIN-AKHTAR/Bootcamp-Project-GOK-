const Express = require("express");
const { grantAccess } = require("../Middlewares/GrantAccess");
const Multer = require("../Middlewares/Multer");
const { Protected } = require("../Middlewares/Protected");
const { CurrentUser } = require("../Middlewares/CurrentUser");
const {
  createUpload,
  updateUpload,
  getUpload,
  deleteUpload,
  getAll,
} = require("../Controllers/UploadController");

const Router = Express.Router();

Router.use(Protected);

Router.route("/").post(
  CurrentUser,
  grantAccess("user"),
  Multer.single("pic"),
  createUpload
);

Router.route("/all").get(getAll);

Router.route("/:id")
  .put(Multer.single("pic"), updateUpload)
  .delete(Protected, deleteUpload)
  .get(Protected, getUpload);

module.exports = Router;
