const customersAPI = require("../utils/CommerceToolsApiClient");
const axios = require("axios");

const URL_GET_CUSTOMERS = `${customersAPI.apiURLBase}/${customersAPI.projectKey}/customers`;
const URL_DELETE_CUSTOMER = `${customersAPI.apiURLBase}/${customersAPI.projectKey}/customers`;
const URL_LOGIN = `${customersAPI.apiURLBase}/${customersAPI.projectKey}/login`;
const URL_TOKEN = `${customersAPI.apiURLBase}/${customersAPI.projectKey}/customers/email-token`;
const URL_MAILER = "http://emails_api:3003/activation";
const URL_MAIL_ACTIVATION = `${customersAPI.apiURLBase}/${customersAPI.projectKey}/customers/email/confirm`;

async function getAllCustomers() {
  try {
    const bearerToken = await customersAPI.getAccessToken();
    const response = await axios.get(URL_GET_CUSTOMERS, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response.data.results || [];
  } catch (err) {
    console.error(err);
  }
}

async function getCustomerById(id) {
  try {
    const bearerToken = await customersAPI.getAccessToken();
    const response = await axios.get(URL_GET_CUSTOMERS + `/${id}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getCustomerByEmailAddress(email) {
  try {
    const bearerToken = await customersAPI.getAccessToken();
    const response = await axios.get(URL_GET_CUSTOMERS, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      params: {
        where: `email="${email}"`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

async function loginCustomer(email, password) {
  try {
    const bearerToken = await customersAPI.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const data = {
      email: email,
      password: password,
    };

    const response = await axios.post(URL_LOGIN, data, config);

    return response.data;
  } catch (err) {
    throw err;
  }
}

async function registerCustomer(
  first_name,
  last_name,
  email,
  password,
  phone_number
) {
  try {
    const bearerToken = await customersAPI.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const data = {
      email: email,
      firstName: first_name,
      lastName: last_name,
      password: password,
      custom: {
        type: {
          key: "customer-phoneNumber",
          typeId: "type",
        },
        fields: {
          phoneNumber: phone_number,
        },
      },
    };

    const response = await axios.post(URL_GET_CUSTOMERS, data, config);

    return response.data;
  } catch (err) {
    throw err;
  }
}

async function getActivationToken(id) {
  const bearerToken = await customersAPI.getAccessToken();
  const config = {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  const data = {
    id: id,
    ttlMinutes: 4320,
  };
  const response = await axios.post(URL_TOKEN, data, config);

  return response.data.value;
}

async function sendActivationMail(email, token) {
  const data = {
    email: email,
    activation_token: token,
  };
  const response = axios.post(URL_MAILER, data, {});
  return response;
}

async function activateMail(activation_token) {
  try {
    const bearerToken = await customersAPI.getAccessToken();
    const config = {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    };

    const data = {
      tokenValue: activation_token,
    };

    const response = await axios.post(URL_MAIL_ACTIVATION, data, config);

    return response;
  } catch (err) {
    throw err;
  }
}

async function deleteAccount(id) {
  try {
    const customer = await getCustomerById(id);
    const customerVersion = customer.version;
    const bearerToken = await customersAPI.getAccessToken();
    const response = await axios.delete(URL_DELETE_CUSTOMER + `/${id}?version=${customerVersion}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (err) {
    throw(err);
  }
}


module.exports = {
  getAllCustomers,
  getCustomerByEmailAddress,
  loginCustomer,
  registerCustomer,
  getActivationToken,
  sendActivationMail,
  activateMail,
  deleteAccount
};
