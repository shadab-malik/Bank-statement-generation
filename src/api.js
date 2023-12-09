const express = require("express");
const bodyParser = require("body-parser");
const generatePDF = require("./pdfGenerator");
const sendEmail = require("./emailService");
const { getTransactions } = require("./database");

const app = express();
app.use(bodyParser.json());

app.post("/generate-statement", async (req, res) => {
  const { email, startDate, endDate } = req.body;

  try {
    // Fetch transactions from the database
    const transactions = await getTransactions(email, startDate, endDate);

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No transactions found" });
    }

    // Generate PDF and getting that pdf file path...
    const pdfFilePath = generatePDF(transactions);
    // Send PDF via email
    const mailres = await sendEmail(email,pdfFilePath);

    res.status(201).json({ msg: "Email sent successfully", preview:mailres.preview  });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = app;
