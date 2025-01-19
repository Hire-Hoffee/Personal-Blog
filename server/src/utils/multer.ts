import multer from "multer";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_VIDEO_SIZE = 20 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const name = `${req.user.id}_${file.originalname}`;
    cb(null, name);
  },
});

export const upload = multer({
  dest: "uploads",
  storage: storageConfig,
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      if (file.size > MAX_IMAGE_SIZE) {
        return cb(new Error("Размер изображения не должен превышать 5 МБ"));
      }
    } else if (ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
      if (file.size > MAX_VIDEO_SIZE) {
        return cb(new Error("Размер видео не должен превышать 20 МБ"));
      }
    } else {
      return cb(new Error("Недопустимый тип файла"));
    }
    cb(null, true);
  },
});
