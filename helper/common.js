export const paginationFun = (data) => {
  const { page = 1, limit = 10 } = data;

  return {
    limit: Number(limit),
    skip: (Number(page) - 1) * Number(limit),
  };
};

export const paginationDetails = ({ page = 1, totalItems, limit }) => {
  const totalPages = Math.ceil(totalItems / limit);

  return { page: Number(page), totalPages, totalItems, limit };
};

export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomTitle = () => {
  const words = [
    "Introduction",
    "Advanced",
    "Basics",
    "Fundamentals",
    "Mastering",
    "Essentials",
    "Concepts",
    "Techniques",
    "Principles",
    "Applications",
  ];
  return `${words[getRandomNumber(0, words.length - 1)]} of ${
    words[getRandomNumber(0, words.length - 1)]
  }`;
};
export const createCategoryList = () => {
  const title = [
    "Development",
    "Business",
    "Finance & Accounting",
    "IT & Software",
    "Office Productivity",
    "Personal Development",
    "Design",
    "Marketing",
    "Lifestyle",
    "Photography & Video",
    "Health & Fitness",
    "Music",
    "Teaching & Academics",
  ];
  return title.map((title) => ({ title }));
};
