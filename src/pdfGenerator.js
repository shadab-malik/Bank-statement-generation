const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generatePDF = (transactions) => {
  const doc = new PDFDocument();
  const filePath = path.join(__dirname, "output.pdf");

  // Pipe the PDF content to a writable stream (file)
  doc.pipe(fs.createWriteStream(filePath));

  doc.text("Transaction Statement");
  doc.moveDown();

  transactions.forEach((transaction) => {
    doc.text(`${transaction.date_of_transaction} - $${transaction.amount}`);
    doc.moveDown();
  });

  // Finalize the PDF
  doc.end();

  // Return the file path
  return filePath;
};

module.exports = generatePDF;
