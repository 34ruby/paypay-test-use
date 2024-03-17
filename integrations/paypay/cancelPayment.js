require('dotenv').config()

const PAYPAY = require('@paypayopa/paypayopa-sdk-node')
PAYPAY.Configure({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET,
  merchantId: process.env.MERCHANT_ID,
  productionMode: false
})

cancelPayment = (requestMerchantPaymentId) => {
  const merchantPaymentId = [requestMerchantPaymentId];
  PAYPAY.PaymentCancel(merchantPaymentId, (response) => {
    console.log(response.BODY)
    const result = response.BODY
    console.log(result)
    // if (result.resultInfo.code === "SUCCESS" && result.data.status === 'COMPLETED') {
    //   console.log(878)
    // } else {
    //   console.log(345435)
    // }
  })
}

module.exports.cancelPayment = cancelPayment