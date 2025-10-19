import multer from "multer";
let storage = multer.diskStorage({
  //cb callback hai
  destination: (req, file, cb) => {
    cb(null, "./public"); //public folder disk  me file ko store krega temp
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
let upload = multer({ storage });
export default upload;
