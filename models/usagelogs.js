import mongoose from "mongoose";

const usageLogSchema = new mongoose.Schema({
  time_on: {
    type: Date,
    default: Date.now,
    required: true,
  },
  last_seen: {
    type: Date,
  },
});

const UsageLog = mongoose.model("usagelog", usageLogSchema);

export default UsageLog;
