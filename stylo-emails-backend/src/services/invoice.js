const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.registerFont('Bold', __dirname + '/../assets/Roboto-Bold.ttf')
  doc.registerFont('Main', __dirname + '/../assets/Roboto-Medium.ttf')
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("src/assets/logo.png", 50, 45, { width: 100 })
    .fillColor("#444444")
    .fontSize(20)
    .font("Main")
    .text("Stylo.", 200, 50, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .font("Main")
    .text("Račun", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Datum računa:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)

    .font("Bold")
    .text(invoice.email, 300, customerInformationTop)
    .font("Main")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.streetName +
      " " +
      invoice.shipping.streetNumber +
      ", " +
      invoice.shipping.postalCode +
      " " +
      invoice.shipping.city +
      ", " +
      invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Stavka",
    "Cijena komada",
    "Komada",
    "Ukupno"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Main");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Sveukupno",
    "",
    formatCurrency(invoice.subtotal)
  );
  doc.font("Main");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Hvala Vam na kupovini!.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 250, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 455, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  return "€" + (cents / 100).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};