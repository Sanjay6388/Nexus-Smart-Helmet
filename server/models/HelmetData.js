const mongoose = require("mongoose");

const helmetDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  temperature: { type: Number, required: true },
  co: { type: Number, required: true },
  co2: { type: Number, required: true },
  distance: { type: Number, required: true },
  heartrate: { type: Number, required: true },
  fall: { type: Boolean, default: false },
  timestamp: { type: Date, required: true },
});

const HelmetData = mongoose.model("HelmetData", helmetDataSchema);

module.exports = HelmetData;