require('dotenv').config()
const { v4: uuidv4 } = require('uuid')

const PAYPAY = require('@paypayopa/paypayopa-sdk-node')
PAYPAY.Configure({
  clientId: process.env.API_KEY,
  clientSecret: process.env.API_SECRET,
  merchantId: process.env.MERCHANT_ID,
  productionMode: false
})

generateQRCode = (amount, callback) => {
  let payload = {
    merchantPaymentId: `payment_${new Date().getTime()}`,
    amount: {
      amount: amount,
      currency: "JPY"
    },
    codeType: "ORDER_QR",
    orderDescription: "Mune's Favourite Cake",
    orderItems: [
      {
        name: 'outaigate cake',
        category: 'sweet',
        quantity: 1,
        productId: '1',
        unitPrice: {
          amount: 0,
          currency: 'JPY'
        }
      },
      {
        name: 'outaigate coffee',
        category: 'drink',
        quantity: 1,
        productId: '2',
        unitPrice: {
          amount: 0,
          currency: 'JPY'
        }
      }
    ],
    isAuthorization: false,
    redirectUrl: `https://paypay.ne.jp/`,
    redirectType: "APP_DEEP_LINK", //WEB_LINK
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1"
  }
  
  PAYPAY.QRCodeCreate(payload, (response) => {
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
