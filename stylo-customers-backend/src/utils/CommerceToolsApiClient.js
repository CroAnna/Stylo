const axios = require("axios");
require("dotenv").config();

class CommerceToolsApiClient {
  static authHost = process.env.AUTH_HOST;
  static clientId = process.env.CLIENT_ID;
  static clientSecret = process.env.CLIENT_SECRET;
  static projectKey = process.env.PROJECT_KEY;
  static apiURLBase = process.env.API_URL;

  static async getAccessToken() {
    const data = new URLSearchParams([
      ["grant_type", "client_credentials"],
      ["scope", `manage_project:${this.projectKey}`],
    ]);

    const config = {
      auth: {
        username: this.clientId,
        password: this.clientSecret,
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    return axios
      .post(this.authHost, data, config)
      .then((res) => {
        return res.data.access_token;
      })
      .catch((err) => {
        return err.message;
      });
  }
}

module.exports = CommerceToolsApiClient;
