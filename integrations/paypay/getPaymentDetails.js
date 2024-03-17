require('dotenv').config()

const PAYPAY = require('@paypayopa/paypayopa-sdk-node')
PAYPAY.Configure({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET,
  merchantId: process.env.MERCHANT_ID,
  productionMode: false
})

getPaymentDetails = (requestMerchantPaymentId, callback) => {
  const merchantPaymentId = [requestMerchantPaymentId];
  PAYPAY.GetCodePaymentDetails(merchantPaymentId, (response) => {
    const result = response.BODY
    if (result.resultInfo.code === "SUCCESS") {
      callback(result)
    }
  })
}

module.exports.getPaymentDetails = getPaymentDetails