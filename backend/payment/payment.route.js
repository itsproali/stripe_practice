const express = require("express");
const User = require("../user/user.model");
const moment = require("moment/moment");
const router = express.Router();

const stripeSecretKey =
  "sk_test_51L58kTBXO2d9Fh4QkcyLQhsVsbtW6QwnB413baMEwOnaBdZsnvoruspf1CCuwZWtEggbtuupQ1ht6B1EZPwS3ydG00zfPKJxI1";

const stripe = require("stripe")(stripeSecretKey);

const [basic, pro, business] = [
  "price_1OFfMtBXO2d9Fh4Qqn1ikKqI",
  "price_1OFfNbBXO2d9Fh4QhN2FG6G2",
  "price_1OFfNyBXO2d9Fh4Q9qvl5bs2",
];

router.post("/create-subscription-session", async (req, res, next) => {
  try {
    const { plan, userId } = req.body;
    let planId = null;

    // Get plan id
    if (plan.price === "9.99") planId = basic;
    else if (plan.price === "19.99") planId = pro;
    else if (plan.price === "49.99") planId = business;

    // Create session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      // trial_end: moment().add(7, "days").unix(),
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    // update user

    const result = await User.findByIdAndUpdate(
      userId,
      { subscription: { sessionId: session?.id } },
      { new: true }
    );

    res.status(200).json({ success: true, session, result });
  } catch (error) {
    console.log(error);
  }
});

router.post("/success", async (req, res, next) => {
  try {
    const { userId, sessionId } = req.body;

    // Get session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid")
      return res
        .status(400)
        .json({ success: false, message: "Payment failed" });

    const subscriptionId = session.subscription;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const planId = subscription.plan.id;
    const planName = subscription.plan.nickname;
    const startDate = moment
      .unix(subscription.current_period_start)
      .format("YYYY-MM-DD");
    const endDate = moment
      .unix(subscription.current_period_end)
      .format("YYYY-MM-DD");
    const durationInSeconds =
      subscription.current_period_end - subscription.current_period_start;
    const durationInDays = moment
      .duration(durationInSeconds, "seconds")
      .asDays();

    // Update user
    const result = await User.findByIdAndUpdate(userId, {
      subscription: {
        subscriptionId,
        planId,
        planName,
        startDate,
        endDate,
        durationInDays,
      },
    });

    // Update user

    res.status(200).json({ success: true, message: "Payment success", result });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
