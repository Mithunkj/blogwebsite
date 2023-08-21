const express = require("express");
const connectDB = require("./db/conn");
const cors = require("cors");
const path = require("path");

port = 7000;

require("dotenv").config();

//connect to database
connectDB();

const app = express();
//using middleware
app.use(express.json());
app.use(cors());

//image path link to frentend to backend
app.use("/public", express.static(path.join(__dirname, "public")));

//router
app.use("/auth", require("./routes/authRouter"));
app.use("/post", require("./routes/postRouter"));

app.listen(port, () => {
  console.log(`app start listnening on port ${port}`);
});
