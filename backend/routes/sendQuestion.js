const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const fs = require('fs');

// Setup multer to store uploads temporarily in 'uploads/' folder
const upload = multer({ dest: 'uploads/' });

router.post('/send-question', upload.array('images'), async (req, res) => {
  const { email, question } = req.body;
  const imageFiles = req.files; // array of uploaded files

  if (!email || !question) {
    return res.status(400).json({ message: 'Missing email or question.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'SalineTTT@gmail.com',
        pass: 'gnswgmoiowellrra', // Gmail App Password
      },
    });

    const mailOptions = {
      from: 'SalineTTT@gmail.com',
      to: 'SalineTTT@gmail.com',
      replyTo: email,
      subject: 'New Question Submitted',
      text: `From: ${email}\n\n${question}`,
      attachments: [],
    };

    if (imageFiles && imageFiles.length > 0) {
      mailOptions.attachments = imageFiles.map((file) => ({
        filename: file.originalname,
        path: file.path,
      }));
    }

    await transporter.sendMail(mailOptions);

    // Clean up uploaded files
    imageFiles.forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Failed to delete file:', file.path);
      });
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ message: 'Failed to send email.', error: error.message });
  }
});

module.exports = router;