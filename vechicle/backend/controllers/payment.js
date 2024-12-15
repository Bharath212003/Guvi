const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  const { amount, token } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method: token.id,
      confirm: true,
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Payment failed' });
  }
};
