const categoriesAPI = require("../utils/CommerceToolsApiClient");
const axios = require("axios");
const { getCommercetoolsCategoryPictureUrl } = require("./EntryService");

const URL_GET_CATEGORIES = `${categoriesAPI.apiURLBase}/${categoriesAPI.projectKey}/categories`;

async function getCategoryById(id) {
  try {
    const bearerToken = await categoriesAPI.getAccessToken();
    console.log(URL_GET_CATEGORIES + "/" + id);
    const response = await axios.get(URL_GET_CATEGORIES + "/" + id, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getCategoryIdByName(categoryName) {
  try {
    const bearerToken = await categoriesAPI.getAccessToken();
    const response = await axios.get(URL_GET_CATEGORIES, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    let categoryId = null;
    response.data.results.map((category) => {
      if (category.name["en-US"].toLowerCase() === categoryName.toLowerCase()) {
        categoryId = category.id;
      }
    });
    return categoryId;
  } catch (err) {
    console.error(err);
  }
}

async function getSubcategories(parentCategoryName) {
  try {
    const parentCategoryId = await getCategoryIdByName(parentCategoryName);
    const PARAMS_GET_SUBCATEGORIES = `?expand=parent&where=parent%28id%3D%22${parentCategoryId}%22%29`;
    const bearerToken = await categoriesAPI.getAccessToken();
    console.log(URL_GET_CATEGORIES + PARAMS_GET_SUBCATEGORIES);
    console.log(URL_GET_CATEGORIES + PARAMS_GET_SUBCATEGORIES);
    const response = await axios.get(
      URL_GET_CATEGORIES + PARAMS_GET_SUBCATEGORIES,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    return Promise.all(
      response.data.results.map(async (subcategory) => {
        return {
          id: subcategory.id,
          name: subcategory.name["en-US"],
          url: await getCommercetoolsCategoryPictureUrl(subcategory.id),
        };
      })
    );
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getCategoryById,
  getSubcategories,
  getCategoryIdByName,
};
