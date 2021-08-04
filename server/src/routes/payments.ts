const router = require('express').Router()
const paymentCtrl = require('../controllers/payments')
import auth from '../middleware/auth'
import authAdmin from '../middleware/authAdmin'


router.route('/payment')
    .get(auth, authAdmin, paymentCtrl.getPayments)
    .post(auth, paymentCtrl.createPayment)


module.exports = router