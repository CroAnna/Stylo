const {sendingMail, sendingMailWithAttachment} = require("../middlewares/mailer");
const {createInvoice} = require("../services/invoice");
async function sendInvoice(req, res) {
  const response = req.body.response;
  const invoice = {
    shipping: response.shippingAddress,
    email: response.customerEmail,
    items: response.lineItems.map(item => {
      return {
        item: item.name["en-US"],
        quantity: item.quantity,
        amount: item.price.value.centAmount
      }
    }),
    subtotal: response.totalPrice.centAmount,
    paid: 1,
  }
  await createInvoice(invoice, "invoice.pdf")
  try {
    var attachment =
      sendingMailWithAttachment({
        from: "Stylo@gmail.com",
        to: `${invoice.email}`,
        subject: "Invoice",
        text: `Hello, here is your invoice`,
        html: `<p>Hello, here is your invoice</p>`,
        attachments: [
          {
            filename: "invoice.pdf",
            path: 'invoice.pdf'
          }
        ]
      });
    return res.status(200).json({success: "Mail sent"});
  } catch (error) {
    console.log(error);
    return res.status(400).json({error: "Couldn't send email"});
  }
}


module.exports = {
  sendInvoice,
};
