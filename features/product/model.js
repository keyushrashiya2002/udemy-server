import mongoose from "mongoose";

const mongooseSchema = mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

mongooseSchema.index({ category: 1 });
mongooseSchema.index({ title: 1 });
const ProductModel = mongoose.model("Product", mongooseSchema);

export default ProductModel;
