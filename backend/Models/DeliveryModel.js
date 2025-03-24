const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DeliverySchema = new Schema(
  {
    orderId: {
      type: String,
      //type: mongoose.Schema.Types.ObjectId,
      //ref: "order",
      required: true,
    },

    driver: {
      type: String,
      //type: mongoose.Schema.Types.ObjectId,
      //ref: "User",
      default: null,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "accepted",
        "declined",
        "picked_up",
        "out_for_delivery",
        "delivered",
        "failed",
      ],
      default: "pending",
    },

    pickup: {
      type: String,
      default: null,
    },

    dropoff: {
      type: String,
      default: null,
    },

    amount: {
      type: Number,
      default: 0,
    },

    proofOfDelivery: {
      type: String,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },

    failedReason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeliveryModel", DeliverySchema);


