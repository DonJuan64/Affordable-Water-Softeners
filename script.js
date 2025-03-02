document.getElementById('learnMoreBtn').addEventListener('click', function() {
    alert('Learn more about our water filtration products!');
});


require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio credentials (Replace with your Twilio details)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

app.post('/send-text', (req, res) => {
    const { name, email, message } = req.body;
    const recipient = "+18322595001"; // Your phone number

    client.messages
        .create({
            body: `New Contact Form Submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
            from: twilioNumber,
            to: recipient,
        })
        .then(() => res.status(200).send("Message sent successfully"))
        .catch(error => res.status(500).send(error));
});

app.listen(port, () => console.log(`Server running on port ${port}`));

