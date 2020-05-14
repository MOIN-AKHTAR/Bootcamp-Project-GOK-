const UploadModel = require("../Models/UploadsModel");
const ErrorClass = require("../Utils/ErrorClass");
const AsyncWrapper = require("../Utils/AsynWrapper");
const UploadValidation = require("../Validations/UploadsValidation/CreateUpload");
const Cloudinary = require("cloudinary");
const _ = require("lodash");
const { SendEmail } = require("../Utils/SendEmail");
require("../Middlewares/Cloudinary");
// @Desc   Create Upload
// @Route   POST api/v1/upload/
// @Access  Private
exports.createUpload = AsyncWrapper(async (req, res, next) => {
  req.body.user = req.user._id;
  req.body.pic = req.file ? req.file.path : "";
  const { error, isValid } = UploadValidation(req.body);
  if (!isValid) {
    return next(new ErrorClass("Validation Error", error, 400));
  }

  const Result = await Cloudinary.v2.uploader.upload(req.file.path);
  req.body.pic = Result.secure_url;
  const Upload = await UploadModel.create(req.body);
  if (!Upload) {
    return next(new ErrorClass("Server Error", undefined, 500));
  }
  SendEmail({
    to: "moinakhter178@gmail.com",
    from: "moin@example.com",
    subject: `A New Upload From ${req.user.name}`,
    text: "New Upload",
    html: ` <div>
        <button onclick={RejectUpload(${Upload._id})}}>Reject</button> 
        <button onclick={ApprovedUpload(${Upload._id})}}>Approved</button>
      </div>`,
  });
  res.status(201).json({
    success: true,
    data: Upload,
  });
});

// @Desc   Update Upload
// @Route   PUT api/v1/upload/:id
// @Access  Private
exports.updateUpload = AsyncWrapper(async (req, res, next) => {
  // Finding Upload
  let Upload = await UploadModel.findById(req.params.id);
  if (!Upload) {
    return next(new ErrorClass("Couldn't Find This Upload", undefined, 404));
  }
  // Checking Person Who Trying To Update Is One Who Created
  const isAuthorized = req.user.id.toString() === Upload.user.toString();
  if (!isAuthorized) {
    return next(
      new ErrorClass("You Are Not Authorized For This Action", undefined, 403)
    );
  }
  if (req.file) {
    const Result = await Cloudinary.v2.uploader.upload(req.file.path);
    req.body.pic = Result.secure_url;
  }
  Upload = _.extend(Upload, req.body);
  const { error, isValid } = UploadValidation(Upload);
  if (!isValid) {
    return next(new ErrorClass("Validation Error", error, 400));
  }
  await Upload.save();
  res.status(200).json({
    success: true,
    data: Upload,
  });
});

// @Desc   Delete Upload
// @Route   DELETE api/v1/upload/:id
// @Access  Private
exports.deleteUpload = AsyncWrapper(async (req, res, next) => {
  const Upload = await UploadModel.findById(req.params.id);
  if (!Upload) {
    return next(
      new ErrorClass("Couldn't Find Upload With This ID", undefined, 404)
    );
  }
  const isAuthenticated = req.user.id.toString() === Upload.user.toString();
  if (!isAuthenticated) {
    return next(
      new ErrorClass(
        "You Are Not Authenticated For This Action",
        undefined,
        401
      )
    );
  }
  await Upload.remove();
  res.status(200).json({
    success: true,
  });
});

// @Desc   Delete Uploads
// @Route   DELETE api/v1/upload/all
// @Access  Private

exports.deleteAllUploads = AsyncWrapper(async (req, res, next) => {
  const Uploads = await UploadModel.deleteMany({
    user: req.user.id,
  });
  if (!Uploads) {
    return next(
      new ErrorClass("Couldn't Find Upload With This ID", undefined, 404)
    );
  }
  res.status(200).json({
    success: true,
  });
});

// @Desc   Get Single Upload
// @Route   Get api/v1/upload/:id
// @Access  Private
exports.getUpload = AsyncWrapper(async (req, res, next) => {
  const Upload = await UploadModel.findOne({
    _id: req.params.id,
    status: "active",
  });

  if (!Upload) {
    return next(
      new ErrorClass("Couldn't Find Upload With This ID", undefined, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: Upload,
  });
});

// @Desc   Get All Upload Of Specific User
// @Route   Get api/v1/upload/all
// @Access  Private
exports.getAll = AsyncWrapper(async (req, res, next) => {
  const Upload = await UploadModel.find({
    active: true,
    user: req.user.id,
  });
  if (!Upload) {
    return next(new ErrorClass("Server Error", undefined, 500));
  }
  res.status(200).json({
    success: true,
    count: Upload.length,
    data: Upload,
  });
});

// @Desc   Change Uploads Status
// @Route   Patch api/v1/upload/reject/:id
// @Access  Just For Admins
exports.rejectUpload = AsyncWrapper(async (req, res, next) => {
  const Upload = await UploadModel.findById(req.params.id);

  if (!Upload) {
    return next(
      new ErrorClass("Couldn't Find Upload With This ID", undefined, 404)
    );
  }
  Upload.status = "rejected";
  await Upload.save();
  res.status(200).json({
    success: true,
    data: Upload,
  });
});

// @Desc   Change Uploads Status
// @Route   Patch api/v1/upload/approved/:id
// @Access  Just For Admins
exports.approveUpload = AsyncWrapper(async (req, res, next) => {
  const Upload = await UploadModel.findById(req.params.id);

  if (!Upload) {
    return next(
      new ErrorClass("Couldn't Find Upload With This ID", undefined, 404)
    );
  }
  Upload.status = "approved";
  await Upload.save();
  res.status(200).json({
    success: true,
    data: Upload,
  });
});

// @Desc   Get History Based On Given Month
// @Route   Patch api/v1/upload/history/month/:month
// @Access  Private
exports.getHistoryViaMonth = AsyncWrapper(async (req, res, next) => {
  const Uploads = await UploadModel.find({
    month: req.params.month,
    user: req.user.id,
  });
  if (!Uploads) {
    return next(new ErrorClass("Server Error", undefined, 500));
  }
  res.status(200).json({
    success: true,
    count: Uploads.length,
    data: Uploads,
  });
});

// @Desc   Get History Based On Given Year
// @Route   Patch api/v1/upload/history/year/:year
// @Access  Private
exports.getHistoryViaYear = AsyncWrapper(async (req, res, next) => {
  const Uploads = await UploadModel.find({
    year: req.params.year,
    user: req.user.id,
  });
  if (!Uploads) {
    return next(new ErrorClass("Server Error", undefined, 500));
  }
  res.status(200).json({
    success: true,
    count: Uploads.length,
    data: Uploads,
  });
});