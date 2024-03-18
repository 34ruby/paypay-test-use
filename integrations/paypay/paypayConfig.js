require('dotenv').config()
const { v4: uuidv4 } = require('uuid')

const PAYPAY = require('@paypayopa/paypayopa-sdk-node')
PAYPAY.Configure({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET,
  merchantId: process.env.MERCHANT_ID,
  productionMode: false
})

generateQRCode = (reqBody, callback) => {  
  PAYPAY.QRCodeCreate(reqBody, (response) => {
    console.log(response)
    if (response.BODY && response.BODY.resultInfo && response.BODY.resultInfo.code === "SUCCESS") {
      const qrCodeUrl = response.BODY.data.url
      const merchantPaymentId = response.BODY.data.merchantPaymentId
      callback(qrCodeUrl, merchantPaymentId)
    }
    else {
      callback(null, null)
    }
  })
}

module.exports.generateQRCode = generateQRCode
