const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
import mongoose from "mongoose";
import Utils from "../utils";

console.log("process.env.MONGODB_URL", process.env.MONGODB_URL)
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

mongoose.connection.on("error", err => {
  console.log("Connect MONDGODB ERROR")
  Utils.Logger.error(err);
});

mongoose.set("debug", true);


