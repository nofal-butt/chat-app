import mongoose from "mongoose";

const Setting = mongoose.Schema({
  target: {
    type: String,
    require: true,
  },
  desktopURL: {
    type: String,
    require: true,
  },
  mobileURL: {
    type: String,
    require: true,
  },
  shop: {
    type: String,
    require: true,
  },
});

const SettingModel = mongoose.model("General", Setting);
export default SettingModel;
