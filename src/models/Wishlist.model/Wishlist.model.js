const { Schema, model } = require("mongoose");
const { ModelRefNames } = require("../../constants");
const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelRefNames.User,
    },
    products: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelRefNames.Product,
      sparse: true,
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

wishlistSchema.pre("save", async function (next) {
  next();
});

const Wishlist = model(ModelRefNames.Wishlist, wishlistSchema);
module.exports = Wishlist;
