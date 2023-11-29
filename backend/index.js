const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const connectDB = require("./utils/connectDB");

// Routers
const userRouter = require("./user/user.route");
const paymentRouter = require("./payment/payment.route");
const emailRouter = require("./email/email.route");

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Hello from Stripe Test Server!");
});

// User
app.use("/user", userRouter);
app.use("/payment", paymentRouter);
app.use("/email", emailRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
