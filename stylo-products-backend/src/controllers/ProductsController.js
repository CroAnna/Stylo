const service = require("../services/ProductsService");

async function getAllProducts(req, res) {
  try {
    const limit = req.body.limit;
    const products = await service.getAllProducts(limit);
    return res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

async function getProductsList(req, res) {
  try {
    const limit = req.body.limit;
    const products = await service.getAllProducts(limit);
    let productList = [];
    products.map((product) => {
      let id = product.id;
      let manufacturer = product.masterData.current.name["en-US"].split(" ")[0];
      let productModel = product.masterData.current.name["en-US"]
        .split(" ")
        .splice(1)
        .join(" ");
      let productPrice =
        product.masterData.staged.masterVariant.prices[0].value.centAmount /
        100;
      let images = product.masterData.current.variants.map((v) =>
        v.images.map((image) => {
          return image.url;
        })
      );
      let masterVariantImages =
        product.masterData.staged.masterVariant.images.map((image) => {
          return image.url;
        });
      let allImages = [...masterVariantImages, ...images];

      let isAvailable =
        product.masterData.staged.masterVariant.availability.availableQuantity >
        0;
      if (!isAvailable) {
        for (const variant of product.masterData.current.variants) {
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
      productList.push(sortedProduct);
    });
    return res.status(200).json(productList);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

async function getProductById(req, res) {
  const product = await service.getProductById(req.params.id);
  if (product != undefined) {
    try {
      const productJSON = product[0];
      const productId = productJSON.id;
      const manufacturer =
        productJSON.masterData.current.name["en-US"].split(" ")[0];
      const productModel = productJSON.masterData.current.name["en-US"]
        .split(" ")
        .splice(1)
        .join(" ");
      const productPrice =
        productJSON.masterData.staged.masterVariant.prices[0].value.centAmount /
        100;

      const productType = await service.getProductType(
        productJSON.productType.id
      );

      const categories = await Promise.all(
        productJSON.masterData.current.categories.map(async (category) => {
          return await service.getCategoryById(category.id);
        })
      );

      let variants = productJSON.masterData.current.variants.map((v) => {
        return {
          sku: v.sku,
          color: v.attributes[1].value,
          images: v.images.map((image) => image.url),
          size: v.attributes[0].value,
          quantity: v.availability.availableQuantity,
        };
      });

      variants.unshift({
        sku: productJSON.masterData.staged.masterVariant.sku,
        size: productJSON.masterData.staged.masterVariant.attributes[0]
          .value,
        quantity:
          productJSON.masterData.staged.masterVariant.availability
            .availableQuantity,
        color: productJSON.masterData.staged.masterVariant.attributes[1].value,
        images: productJSON.masterData.staged.masterVariant.images.map(
          (image) => image.url
        ),
      });

      const modifiedVariants = variants.map((item) => {
        const lastIndex = item.sku.lastIndexOf("-");
        const modifiedSku = item.sku.substring(0, lastIndex);
        return { ...item, sku: modifiedSku };
      });

      const sortedVariants = modifiedVariants.reduce((acc, item) => {
        const existingSku = acc.find((entry) => entry.sku === item.sku);
        if (existingSku) {
          existingSku.sizes.push({
            size: item.size,
            quantity: item.quantity,
          });
        } else {
          acc.push({
            sku: item.sku,
            color: item.color,
            images: item.images,
            sizes: [{ size: item.size, quantity: item.quantity }],
          });
        }
        return acc;
      }, []);

      let isAvailable = false;
      for (const variant of sortedVariants) {
        for (const size of variant.sizes) {
          if (size.quantity > 0) {
            isAvailable = true;
            break;
          }
        }
      }

      const productDetailsJSON = {
        id: productId,
        manufacturer: manufacturer,
        model: productModel,
        available: isAvailable,
        price: productPrice,
        type: productType,
        categories: categories,
        variants: sortedVariants,
      };

      if (product.length > 0) {
        return res.status(200).json(productDetailsJSON);
      } else {
        return res.status(404).json({ error: "Product doesn't exist" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch product details" });
    }
  } else {
    return res.status(404).json({ error: "Invalid ID format" });
  }
}

async function getFilteredProducts(req, res) {
  const { gender, category, size, color } = req.query;
  const limit = req.body.limit;
  try {
    const products = await service.getFilteredProductList(
      limit,
      gender,
      category,
      size,
      color
    );
    return res.status(200).json(products);
  } catch (err) {
    return res
      .status(404)
      .json({ error: "Parameters not entered or entered incorrectly." });
  }
}

module.exports = {
  getAllProducts,
  getProductsList,
  getProductById,
  getFilteredProducts,
};
