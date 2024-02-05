const service = require("../services/HomepageService");

async function getHomepage(req, res) {
  const homepage = await service.getHomepage();
  res.json(homepage);
}

module.exports = {
  getHomepage,
};
