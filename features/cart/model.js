import mongoose from "mongoose";

const mongooseSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const CartModel = mongoose.model("Cart", mongooseSchema);

export default CartModel;
