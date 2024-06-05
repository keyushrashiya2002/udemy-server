import {
  createCategoryList,
  getRandomNumber,
  getRandomTitle,
} from "../../helper/common.js";
import ProductModel from "../product/model.js";
import CategoryModel from "./model.js";

export const fakeDataEntry = async (req, res, next) => {
  const count = await CategoryModel.estimatedDocumentCount();
  if (count === 0) {
    const categoriesList = createCategoryList();
    const categoryData = await CategoryModel.insertMany(categoriesList);

    const products = [];
    for (let i = 0; i < 100; i++) {
      const randomCategory =
        categoryData[getRandomNumber(0, categoryData.length - 1)];
      const price = getRandomNumber(100, 1000);
      const title = getRandomTitle();

      products.push({
        category: randomCategory.id,
        title,
        price,
      });
    }
    const result = await ProductModel.insertMany(products);
  }

  next();
};
