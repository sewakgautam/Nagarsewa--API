import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filepath = req.route.path;
    let final = filepath.replace("/add", "");
    let storagePath = `./images/${final}`;
    cb(null, `${storagePath}`);
    // console.log(storagePath)
  },
  filename: function (req, file, cb) {
    if (req.body.title) {
      let filepath = `${req.body.title}-categories`;
      cb(null, filepath + path.extname(file.originalname));
    } else if (req.body.fullname) {
      let filepath = `${req.body.fullname}-staffs`;
      cb(null, filepath + path.extname(file.originalname));
    } else {
      let filepath = `${req.body.name}nagarpalika`;
      cb(null, filepath + path.extname(file.originalname));
    }
  },
});
export const upload = multer({
  storage: storage,
});
