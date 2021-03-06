const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "event",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
