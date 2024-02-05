const service = require("../services/LayoutService");

async function getLayout(req, res) {
  const layout = await service.getLayout();
  res.json({layout: {header: layout[0], footer: layout[1]}});
}

module.exports = {
  getLayout,
};
