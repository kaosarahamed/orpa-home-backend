require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY)

const RedirectURL = async (req, res) => {
const account = await stripe.accounts.create({
  type: 'standard',
});
const accountLink = await stripe.accountLinks.create({
  account: `${account.id}`,
  refresh_url: 'http://localhost:5173/',
  return_url: 'http://localhost:5173/',
  type: 'account_onboarding',
});
   res.status(200).json({url : accountLink.url, id : account.id});
};



const seasionResponse = async (req, res) => {
  const id = req.body.id;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // You can add more types like 'ideal', 'alipay', etc.
      line_items: [
        {
          price_data: {
            currency: 'usd', // Replace with your desired currency
            product_data: {
              name: 'My Shirt', // Replace with your product name
              // You can add more product information here like images, description, etc.
            },
            unit_amount: 10000000, // Replace with the actual price in the smallest currency unit (e.g., cents for USD)
          },
          quantity: 1, // Replace with the desired quantity
        },
      ],
      mode: 'payment',
      success_url: `${process.env.SUCESS_URL}`,
      cancel_url: `${process.env.ERROR_URL}`,
    },
    {
      stripeAccount: `${id}`,
    }
    );

    // Send the session ID back to the client
    res.json({ sessionId: session.url});
  } catch (error) {
    console.error('Error creating session:', error.message);
    res.status(500).json({ error: 'Failed to create session' });
  }
}


module.exports = {RedirectURL, seasionResponse}