const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    console.log(file);
    const filename = file.originalname;
    const newName = filename.split(".");
    console.log(newName);
    cb(null, newName[0] + uniqueSuffix + "." + newName[1]);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
