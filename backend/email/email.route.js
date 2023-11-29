const express = require("express");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();

router.post("/send", async (req, res) => {
  try {
    const { email, subject, text } = req.body;
    await sendEmail({ email, subject, text });

    res.status(200).json({ success: true, email: `Email sent to ${email}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
