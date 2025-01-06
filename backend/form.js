const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an instance of express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Route to handle checkout and email sending
app.post('/checkout', async (req, res) => {
  const { userEmail, productOwnerEmail, productName } = req.body;

  // Check if necessary data is provided
  if (!userEmail || !productOwnerEmail || !productName) {
    return res.status(400).send('Missing required fields.');
  }

  // Nodemailer transporter setup (using Gmail in this example)
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'pratikvithal-cmpn@atharvacoe.ac.in',  // Replace with your Gmail address
      pass: 'admin@123'  // Replace with your Gmail app password
    }
  });

  // Email options
  const mailOptions = {
    from: 'pratikvithal-cmpn@atharvacoe.ac.in',
    to: productOwnerEmail,  // Send email to the product owner
    subject: `Product Checkout - ${productName}`,
    text: `You have received a checkout request from ${userEmail} for the product: ${productName}.`
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send('Checkout email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email.');
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
