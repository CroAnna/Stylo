const axios = require("axios");
const {getCategoryById} = require("./CategoriesService");

const LAYOUT_ID = "3ATJT5RN7J6DzfXIhwEOJd";
const URL_GET_ENTRY = `${process.env.CONTENTFUL_API_BASE_URL}/spaces/${process.env.CONTENTFUL_API_SPACEID}/entries/`;
const GET_HEADER_PARAMS = `?include=3&content_type=layout&sys.id=${LAYOUT_ID}&select=fields.header`;
const GET_FOOTER_PARAMS = `?content_type=layout&sys.id=${LAYOUT_ID}&select=fields.footer`;

const token = process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN;
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  }
}

async function getHeaderCategoriesIds() {
  try {
    const response = await axios.get(URL_GET_ENTRY + GET_HEADER_PARAMS, config);
    let categoryArray = response.data.includes.Entry;
    return processHeaderCategoriesIds(categoryArray);
  } catch (err) {
    console.error(err);
  }
}

function processHeaderCategoriesIds(categoryArray) {
  categoryArray.shift();
  return categoryArray.map(category => category.fields.id);
}

async function getHeaderCategories(categoryIds) {
  return Promise.all(categoryIds.map(id => getCategoryById(id)));
}

async function getFooter() {
  try {
    const response = await axios.get(URL_GET_ENTRY + GET_FOOTER_PARAMS, config);
    return response.data.includes.Entry[0].fields;
  } catch (err) {
    console.error(err);
  }
}

async function getLayout() {
  let headerCategories = await getHeaderCategoriesIds()
  let header = await getHeaderCategories(headerCategories);
  let footer = await getFooter();
  return [header.map((category) => {
    return {id: category.id, name: category.name["en-US"]};
  }), footer];
}

module.exports = {
  getLayout,
};
