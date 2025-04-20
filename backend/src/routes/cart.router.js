import express from 'express'
import { addToCart, getCart, removeFromCart, updateCart } from '../controllers/cart.controller.js'
import isLoggedIn from '../middlewares/auth.middleware.js'
const router = express.Router()


router.route('/add').post(isLoggedIn,addToCart)
router.route('/update').patch(isLoggedIn,updateCart)
router.route('/get').get(isLoggedIn,getCart)
router.route('/remove').patch(isLoggedIn,removeFromCart)


export default router