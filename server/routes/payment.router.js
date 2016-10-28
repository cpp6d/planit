var express = require('express');
var paymentRouter = express.Router();
var braintree = require('braintree');
var gateway;

require('dotenv').load();

gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
});

paymentRouter.get('/client_token', (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    res.send(response.clientToken)
  })
})

paymentRouter.post('/checkout', (req, res) => {
  var amount = req.body.amount
  var nonceFromTheClient = req.body.payment_method_nonce
  // Use payment method nonce here
  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      submitForSettlement: true
    }
  }, (err, result) => {
    if (result.success || result.transaction) {
      res.send(result)
    } else {
      transactionErrors = result.errors.deepErrors();
      req.flash('error', {msg: formatErrors(transactionErrors)});
    }
  })
})

module.exports = paymentRouter;
