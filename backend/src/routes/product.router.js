import express from 'express'
const router = express.Router()

import { addProduct, getAllProducts, getOneProduct } from '../controllers/product.controller.js'

router.route('/add').post(addProduct)
router.route('/getall').get(getAllProducts)
router.route('/get/:productId').get(getOneProduct)
export default router