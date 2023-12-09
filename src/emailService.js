const nodemailer = require("nodemailer");

const sendEmail = async (email, pdfFilePath) => {
  try {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    let message = {
      from: testAccount.user,
      to: email,
      subject: "Bank Statement",
      html: "<b>Attached is your bank statement for the given time duration.</b>",
      attachments: [
        {
          filename: "statement.pdf",
          path: pdfFilePath,
        },
      ],
    };

    const info = await transporter.sendMail(message);
    return {
      success: true,
      messageId: info.messageId,
      preview: nodemailer.getTestMessageUrl(info),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }

};

module.exports = sendEmail;
