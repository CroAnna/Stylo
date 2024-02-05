const commerceToolsApi = require("../utils/CommerceToolsApiClient");
const URL_CREATE_CART = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/carts`;
const URL_CREATE_ORDER = `${commerceToolsApi.apiURLBase}/${commerceToolsApi.projectKey}/orders`;
const URL_MAILER = "http://emails_api:3003/invoices";

const axios = require("axios");

function getItemsFromCart(shopping_cart) {
  return shopping_cart.map(item => {
    return {
      sku: item.id,
      quantity: item.quantity
    }
  })
}

async function createCart(shopping_cart, address, customerId, customerEmail) {
  try {
    const bearerToken = await commerceToolsApi.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const data = {
      customerEmail: customerEmail,
      customerId: customerId,
      currency: "EUR",
      lineItems: getItemsFromCart(shopping_cart),
      shippingAddress: address
    };

    const response = await axios.post(URL_CREATE_CART, data, config);

    return response.data.id;
  } catch (err) {
    throw err;
  }
}

async function createOrder(shopping_cart, address, customerId, customerEmail) {
  try {
    const bearerToken = await commerceToolsApi.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const cartId = await createCart(shopping_cart, address, customerId, customerEmail)
    const data = {
      cart: {
        id: cartId,
        typeId: "cart"
      },
      paymentState: "Paid",
      shipmentState: "Pending",
      version: 1
    };
    const response = await axios.post(URL_CREATE_ORDER, data, config);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function sendInvoice(response) {
  const data = {
    response: response,
  };
  await axios.post(URL_MAILER, data, {});
}

module.exports = {
  createOrder,
  sendInvoice
}