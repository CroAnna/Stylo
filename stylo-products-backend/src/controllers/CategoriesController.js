const service = require("../services/CategoriesService");

async function getSubcategories(req, res) {
  const { gender } = req.params;
  try {
    const subcategories = await service.getSubcategories(gender);
    return res.status(200).json(subcategories);
  } catch (err) {
    return res
      .status(404)
      .json({ error: "Categories could not be found" });
  }
}

module.exports = {
  getSubcategories
};
