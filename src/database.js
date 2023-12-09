const fs = require("fs").promises;
const path = require("path");
const csv = require("csv-parser");

const getTransactions = async (email, startDate, endDate) => {
  const transactions = [];

  try {
    const data = await fs.readFile(
      path.join(__dirname, "database.csv"),
      "utf8"
    );
    const rows = data.split("\n");

    for (const row of rows) {
      const [userEmail, dateOfTransaction, amount] = row.split(",");

      if (!userEmail || userEmail!=email) {
        continue;
      }
      const transactionDate = new Date(dateOfTransaction);
      if ( transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate)){
        transactions.push({
          user_email: userEmail,
          date_of_transaction: dateOfTransaction,
          amount: parseFloat(amount),
        });
      }
    }
    return transactions;
  } catch (error) {
    throw error;
  }
};

module.exports = { getTransactions };
