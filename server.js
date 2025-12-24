const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.'));

// Nodemailer transporter (using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '111975prathamesh@gmail.com',
    pass: 'ormwfwuitxfhqync'
  }
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  const { name, phone, email, company, message, requirements, details, time } = req.body;

  // Receiver email
  const receiverMailOptions = {
    from: '111975prthamesh@gmail.com',    replyTo: email,    to: 'linkerrcode@gmail.com',
    subject: `New Form Submission from ${name}`,
    html: `
      <h2>New Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p><strong>Requirements:</strong> ${requirements}</p>
      <p><strong>Details:</strong> ${details}</p>
      <p><strong>Time:</strong> ${time}</p>
    `
  };

  // Sender thank-you email
  const senderMailOptions = {
    from: '111975prthamesh@gmail.com',
    to: email,
    subject: `Thank you for your inquiry, ${name}!`,
    html: `
      <h2>Thank You for Contacting Sudarshan Furnishings!</h2>
      <p>Dear ${name},</p>
      <p>We have received your inquiry and appreciate your interest in our soft furnishing solutions. Our team will review your details and get back to you within 24 hours.</p>
      <p><strong>Your Submitted Details:</strong></p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Company:</strong> ${company}</li>
        <li><strong>Message:</strong> ${message}</li>
        <li><strong>Requirements:</strong> ${requirements}</li>
        <li><strong>Details:</strong> ${details}</li>
        <li><strong>Submitted Time:</strong> ${time}</li>
      </ul>
      <p>If you have any additional information or questions, feel free to reply to this email.</p>
      <p>Best regards,<br>
      Sudarshan Furnishings Team<br>
      Phone: 9850815862<br>
      Address: 396, Sudarshan Furnishings, Narayan Peth, Laxmi Road, Pune – 411030</p>
    `
  };

  try {
    await transporter.sendMail(receiverMailOptions);
    if (email) {
      await transporter.sendMail(senderMailOptions);
    }
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = app;