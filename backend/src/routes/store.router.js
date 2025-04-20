import express from 'express'
import { addStore, getAllStores, getOneStore } from '../controllers/store.controller.js'
const router = express.Router()


router.route('/add').post(addStore)
router.route('/getall').get(getAllStores)
router.route('/get/:storeId').get(getOneStore)






export default router