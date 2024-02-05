const service = require("../services/OrdersService");


async function createOrder(req, res) {
  const { cart, shippingAddress, customerId, customerEmail } = req.body;

  try {
    const response = await service.createOrder(
      cart, shippingAddress, customerId, customerEmail
    );
    try{
      await service.sendInvoice(response)
    } catch(e){
      console.log(e)
    }
    return res.status(200).json({ response });
  } catch (err) {
    return res
      .status(err.response.data.statusCode)
      .json({ Error: err.response.data.message });
  }
}

module.exports = {
  createOrder
}