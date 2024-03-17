const express = require('express')
const app = express()
const { generateQRCode } = require('./integrations/paypay/paypayConfig')
const { getPaymentDetails } = require('./integrations/paypay/getPaymentDetails')
const { cancelPayment } = require('./integrations/paypay/cancelPayment')

app.use(express.json())
app.set('port', process.env.PORT || 3000)
app.use(express.static('public'))

app.post('/generate-qr', (req, res) => {
  const { amount } = req.body
  generateQRCode(amount, (qrCodeUrl, merchantPaymentId) => {
    if (qrCodeUrl && merchantPaymentId) {
      res.send({qrCodeUrl, merchantPaymentId})
    } else {
      res.status(500).send("QR Code creation failed")
    }
  })
})

app.get('/payment-success', (req, res) => {
  res.sendFile(__dirname + '/public/paymentSuccess.html')
})

app.get('/payment-detail', (req, res) => {  
  let requestMerchantPaymentId = req.query.merchantPaymentId
  getPaymentDetails(requestMerchantPaymentId, (result) => {
    if (!result) {
      res.status(500).send("Failed to retrieve payment details");
    } else {
      res.send(result);
    }
  });
})

app.delete('/payment-cancel', (req, res) => {
  let requestMerchantPaymentId = req.query.merchantPaymentId
  cancelPayment(requestMerchantPaymentId, (result) => {
    if (!result) {
      res.status(500).send("Failed to retrieve payment details");
    } else {
      res.send(result);
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(app.get('port'), 'port')
})
