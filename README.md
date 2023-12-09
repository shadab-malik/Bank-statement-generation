# Banking Application Services

This repository contains a set of services for a banking application that fulfills the requirement of generating a PDF file displaying user transactions within a specified date range.

## Services

### 1. API Service

- **File:** `api.js`
- **Endpoint:** `/generate-statement`
- **Usage:** Exposes a POST API to request a transaction statement within a specified date range for a given user email.

### 2. Database Service

- **File:** `database.js`
- **Function:** `getTransactions(email, startDate, endDate)`
- **Usage:** Reads a CSV file (`database.csv`) containing user transactions, filters data based on the provided parameters, and returns relevant transactions.

### 3. PDF Generation Service

- **File:** `pdfGenerator.js`
- **Function:** `generatePDF(transactions)`
- **Usage:** Creates a PDF document displaying user transactions and returns the file path.

### 4. Email Service

- **File:** `emailService.js`
- **Function:** `sendEmail(email, pdfFilePath)`
- **Usage:** Utilizes Nodemailer to send an email with the generated PDF attached to the specified user email.

## How to Run

1. Install dependencies:

   ```bash
   npm install

   ```

2. Run the API service:
   ```bash
   node api.js
   ```

## Testing

1. Use Postman or a similar tool to send a POST request to `http://localhost:PORT/generate-statement` with the following JSON payload:

   ```json
   {
     "email": "user@example.com",
     "startDate": "2023-01-01",
     "endDate": "2023-12-31"
   }
   ```

2. Ensure the response indicates success and check your email for the generated PDF attachment.

## Technologies Used

- **Node.js:** Chosen for its non-blocking, asynchronous nature, well-suited for handling I/O operations such as reading files and sending emails.
- **Express:** A minimal and flexible Node.js web application framework for creating the API service.
- **Nodemailer:** Used for sending emails, providing a simple and powerful solution.
- **PDFKit:** Utilized for generating PDF documents, offering a convenient way to create and modify PDF files.

## Notes

- Error handling is implemented to ensure robustness in various scenarios.
- The database is simulated using a CSV file (`database.csv`), and the solution can be adapted to use a more sophisticated database system.

## Bonus: Adding Authorization and Authentication

### Authorization:

To add authorization to the banking application services, you can implement token-based authentication. This involves issuing a token to authenticated users and requiring this token to be included in the headers of API requests. Follow these steps:

1. Choose an authentication middleware: Utilize a popular library like Passport.js to implement authentication strategies (e.g., JWT).

2. Implement a login endpoint: Create an endpoint that verifies user credentials and issues a token upon successful authentication.

3. Secure API routes: Add middleware to your API routes that verifies the presence and validity of the token. Only allow access to authenticated users.

### Authentication:

1. **Express Middleware:**

   - Utilize middleware functions in Express to handle authentication.
   - Example middleware to check for a valid token:

     ```javascript
     const jwt = require("jsonwebtoken");

     const authenticateToken = (req, res, next) => {
       const token = req.header("Authorization");
       if (!token) return res.status(401).send("Unauthorized");

       jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
         if (err) return res.status(403).send("Forbidden");
         req.user = user;
         next();
       });
     };

     // Apply middleware to a route
     app.get("/secured-route", authenticateToken, (req, res) => {
       // Your secure route logic
     });
     ```

2. **Token Generation:**

   - When a user successfully logs in, generate a token using a library like `jsonwebtoken`.
   - Send this token to the client, and the client includes it in the headers of subsequent requests.

3. **Secure Sensitive Operations:**
   - For operations that require higher privileges (e.g., generating PDFs, sending emails), ensure that the user has the necessary authorization.

### Environment Variables:

To enhance security, store sensitive information like secret keys in environment variables. Use a tool like `dotenv` to manage these variables.

### Secure Email Service:

If your email service requires authentication (e.g., SMTP), ensure to use secure methods to store and retrieve email credentials.

Remember to update your API documentation to include information about the authentication process and the required headers for secured routes.
