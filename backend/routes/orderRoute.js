import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'
const orderRouter = express.Router()
//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razor',authUser,placeOrderRazorpay)

//user feature
orderRouter.post('/userOrders',authUser,userOrders)

export default orderRouter