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
  approveUpload,
  rejectUpload,
  pendUpload,
  getHistoryViaMonth,
  getHistoryViaYear,
  deleteAllUploads,
} = require("../Controllers/UploadController");

const Router = Express.Router();

Router.route("/approved/:id").patch(approveUpload);
Router.route("/reject/:id").patch(rejectUpload);
Router.route("/pend/:id").patch(pendUpload);

Router.use(Protected);

Router.route("/").post(
  CurrentUser,
  grantAccess("user"),
  Multer.single("pic"),
  createUpload
);

Router.route("/history/month/:month").get(getHistoryViaMonth);
Router.route("/history/year/:year").get(getHistoryViaYear);

Router.route("/all").get(getAll).delete(deleteAllUploads);

// Route.route("")

Router.route("/:id")
  .put(Multer.single("pic"), updateUpload)
  .delete(deleteUpload)
  .get(getUpload);

module.exports = Router;
