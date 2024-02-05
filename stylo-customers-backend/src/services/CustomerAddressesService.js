const customersAPI = require("../utils/CommerceToolsApiClient");
const axios = require("axios");

const URL_GET_CUSTOMERS = `${customersAPI.apiURLBase}/${customersAPI.projectKey}/customers`;

async function addAddress(customerId, customerVersion ,address) {
  try {
    const bearerToken = await customersAPI.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const data = {
      version: customerVersion,
      actions: [
        {
          action: "addAddress",
          address: address
        }
      ]
    };
    const response = await axios.post(URL_GET_CUSTOMERS + `/${customerId}`, data, config);
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function changeAddress(customerId, customerVersion, addressId, address) {
  try {
    const bearerToken = await customersAPI.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };
    const data = {
      version: customerVersion,
      actions: [
        {
          action: "changeAddress",
          addressId: addressId,
          address: address
        }
      ]
    };
    const response = await axios.post(URL_GET_CUSTOMERS + `/${customerId}`, data, config);
    return response.data;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addAddress,
  changeAddress
};
