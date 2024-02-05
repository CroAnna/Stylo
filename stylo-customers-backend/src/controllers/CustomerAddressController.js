const service = require("../services/CustomerAddressesService");

async function addAddress(req, res) {
  const {customerId, customerVersion, address} = req.body;
  try {
    const response = await service.addAddress(customerId, customerVersion, address);
    return res.status(200).json({response})
  } catch (err) {
    return res
      .status(401)
      .json({Error: err.response.data.message});
  }
}

async function changeAddress(req, res) {
  const {customerId, customerVersion, addressId, address} = req.body;
  try {
    const response = await service.changeAddress(customerId, customerVersion, addressId, address);
    return res.status(200).json({response})
  } catch (err) {
    return res
      .status(401)
      .json({Error: err.response.data.message});
  }
}


module.exports = {
  addAddress,
  changeAddress
};
