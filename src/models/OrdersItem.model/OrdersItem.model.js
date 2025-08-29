const mongoose = require("mongoose");
const { ModelRefNames } = require("../../constants");

const OrdersItemsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ModelRefNames.Product,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false
  }
);

const OrdersItem = mongoose.model(ModelRefNames.OrdersItem, OrdersItemsSchema);

module.exports = OrdersItem;
