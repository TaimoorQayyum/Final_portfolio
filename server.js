const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // Or any port you like

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your email and app password
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'connect.anythingchain@gmail.com',
        subject: `Portfolio Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, error: error.toString() });
        }
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});