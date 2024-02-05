const axios = require("axios");
const commerceToolsApi = require("../utils/CommerceToolsApiClient");
const categoriesService = require("../services/CategoriesService");
const URL_GET_PRODUCTS = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/products`;
const URL_GET_PRODUCT_TYPE = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/product-types`;
const URL_GET_PRODUCT = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/product-projections/search`;
const URL_GET_PRODUCTS_FILTER = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/product-projections`;
const URL_GET_CATEGORY = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/categories`;

let offset = 0;
let offset_filtered = 0;

async function getAllProducts(limit) {
  limit = parseInt(limit);
  if (!limit) limit = 20;
  try {
    const bearerToken = await commerceToolsApi.getAccessToken();
    const response = await axios.get(URL_GET_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        limit: limit,
        offset: offset,
      },
    });

    let products = response.data.results;
    if (products.length === 0) {
      offset = 0;
      const bearerToken = await commerceToolsApi.getAccessToken();
      const secondResponse = await axios.get(URL_GET_PRODUCTS, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        params: {
          limit: limit,
          offset: offset,
        },
      });
      products = secondResponse.data.results;
      offset += limit;
    } else {
      offset += limit;
    }

    return products;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getFilteredProductList(limit, gender, category, size, color) {
  limit = parseInt(limit);
  if (!limit) limit = 20;
  try {
    const bearerToken = await commerceToolsApi.getAccessToken();
    let queryParams = {
      where: "",
      limit: limit,
      offset: offset_filtered,
    };

    let genderSubcategories = [];
    if (gender) {
      gender = gender.charAt(0).toUpperCase() + gender.slice(1);
      const subcategories = await categoriesService.getSubcategories(gender);
      genderSubcategories = subcategories;
    }

    if (gender && category) {
      switch (gender) {
        case "Muškarci":
          category += "M";
          break;
        case "Žene":
          category += "Ž";
          break;
        case "Djeca":
          category += "D";
          break;
      }
      for (const subcategory of genderSubcategories) {
        if (subcategory.name.toLowerCase() === category.toLowerCase()) {
          const categoryId = await categoriesService.getCategoryIdByName(
            category
          );
          const genderId = await categoriesService.getCategoryIdByName(gender);
          queryParams.where += `${
            queryParams.where.length > 0 ? " and " : ""
          }(categories(id="${genderId}") and categories(id="${categoryId}"))`;
        }
      }
    }

    if (gender && !category) {
      const genderId = await categoriesService.getCategoryIdByName(gender);
      if (genderId != null) {
        queryParams.where += `${
          queryParams.where.length > 0 ? " and " : ""
        }(categories(id="${genderId}"))`;
      }
    }

    if (!gender && category) {
      let suffixes = ["M", "Ž", "D"];
      for (const suffix of suffixes) {
        const categoryId = await categoriesService.getCategoryIdByName(
          category + suffix
        );
        if (categoryId != null) {
          queryParams.where += `${
            queryParams.where.length > 0 ? " or " : ""
          }(categories(id="${categoryId}"))`;
        }
        queryParams.where = `(${queryParams.where})`;
      }
    }

    if (size) {
      queryParams.where += `${
        queryParams.where.length > 0 ? " and " : ""
      }(masterVariant(attributes(name="Size" and value=${size})) or variants(attributes(name="Size" and value=${size})))`;
    }

    if (color) {
      color = color.charAt(0).toUpperCase() + color.slice(1);
      queryParams.where += `${
        queryParams.where.length > 0 ? " and " : ""
      }(masterVariant(attributes(name="Color" and value="${color}")) or variants(attributes(name="Color" and value="${color}")))`;
    }

    console.log("QUERY PARAMS: " + queryParams.where);

    let response = await axios.get(URL_GET_PRODUCTS_FILTER, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: queryParams,
    });

    if (response.data.results.length === 0) {
      offset_filtered = 0;
      const bearerToken = await commerceToolsApi.getAccessToken();
      queryParams.limit = limit;
      queryParams.offset = offset_filtered;
      const secondResponse = await axios.get(URL_GET_PRODUCTS_FILTER, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        params: queryParams,
      });
      response = secondResponse;
      offset_filtered += limit;
    } else {
      offset_filtered += limit;
    }

    let sortedResponse = [];
    response.data.results.map((product) => {
      let id = product.id;
      let manufacturer = product.name["en-US"].split(" ")[0];
      let productModel = product.name["en-US"].split(" ").splice(1).join(" ");
      let productPrice = product.masterVariant.prices[0].value.centAmount / 100;
      let images = product.variants.map((v) =>
        v.images.map((image) => {
          return image.url;
        })
      );

      let masterVariantImages = product.masterVariant.images.map((image) => {
        return image.url;
      });
      let allImages = [...masterVariantImages, ...images];

      let isAvailable =
        product.masterVariant.availability.availableQuantity > 0;
      if (!isAvailable) {
        for (const variant of product.variants) {
          if (variant.availability.availableQuantity > 0) {
            isAvailable = true;
            break;
          }
        }
      }

      const sortedProduct = {
        id: id,
        manufacturer: manufacturer,
        model: productModel,
        price: productPrice,
        available: isAvailable,
        images: allImages,
      };
      sortedResponse.push(sortedProduct);
    });

    return sortedResponse;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function getProductById(id) {
  const bearerToken = await commerceToolsApi.getAccessToken();
  try {
    const response = await axios.get(URL_GET_PRODUCTS, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        where: `id="${id}"`,
      },
    });
    return response.data.results || [];
  } catch (err) {
    console.error(err);
  }
}

async function getProductType(id) {
  const bearerToken = await commerceToolsApi.getAccessToken();
  try {
    const response = await axios.get(URL_GET_PRODUCT_TYPE, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        where: `id="${id}"`,
      },
    });
    return response.data.results[0].name;
  } catch (err) {
    console.error(err);
    return "Couldn't retrieve type";
  }
}

async function getCategoryById(id) {
  const bearerToken = await commerceToolsApi.getAccessToken();
  try {
    const response = await axios.get(URL_GET_CATEGORY, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        where: `id="${id}"`,
      },
    });
    return response.data.results[0].name["en-US"];
  } catch (err) {
    console.error(err);
    return "Couldn't retrieve category";
  }
}

async function getProductForHomepage(id) {
  try {
    const bearerToken = await commerceToolsApi.getAccessToken();
    const response = await axios.get(
      URL_GET_PRODUCT + `?filter=variants.sku:"${id}"`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    let shoe = response.data.results[0];
    return {
      id: shoe.id,
      manufacturer: shoe.name["en-US"].split(" ")[0],
      model: shoe.name["en-US"].split(" ").splice(1).join(" "),
      available: await checkVariantAvailability(shoe),
      price: shoe.masterVariant.prices[0].value.centAmount / 100,
      images: [shoe.masterVariant.images[0].url],
    };
  } catch (err) {
    throw err;
  }
}

async function checkVariantAvailability(shoe) {
  let variants = shoe.variants;
  variants.push(shoe.masterVariant);
  return variants.some(variant => variant.availability.isOnStock == true);
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductType,
  getCategoryById,
  getProductForHomepage,
  getFilteredProductList,
};
