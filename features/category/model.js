import mongoose from "mongoose";

const mongooseSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true, lowercase: true },
});

const CategoryModel = mongoose.model("Category", mongooseSchema);

export default CategoryModel;
