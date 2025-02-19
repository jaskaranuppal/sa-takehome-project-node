const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const env = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var app = express();

// view engine setup (Handlebars)
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))
app.use(express.json({}));

/**
 * Home route
 */
app.get('/', function(req, res) {
  res.render('index');
});

/**
 * Get Publishable key
 */
app.get('/config', (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});


/**
 * Checkout route
 */
app.get('/checkout', function(req, res) {
  // Just hardcoding amounts here to avoid using a database
  const item = req.query.item;
  let title, amount, error;

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering"
      amount = 2300      
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993"
      amount = 2500
      break;     
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source"
      amount = 2800  
      break;     
    default:
      // Included in layout view, feel free to assign error
      error = "No item selected"      
      break;
  }

  res.render('checkout', {
    title: title,
    amount: amount,
    error: error
  });
});

app.post('/create-payment-intent', async(req, res) => {

  let paymentIntent;
  try{
    paymentIntent = await stripe.paymentIntents.create ({
        amount: req.body.amount,
        currency: 'aud',
        automatic_payment_methods: { enabled: true }
    })
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  }
  catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
})


/**
 * Success route
 */
app.get('/success', function(req, res) {
  const paymentIntentId = req.query.payment_intent
  res.render('success', { paymentIntentId});
});

/**
 * Start server
 */
app.listen(3000, () => {
  console.log('Getting served on port 3000');
});
