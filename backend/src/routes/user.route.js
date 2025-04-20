import express from 'express'
import { getUser, loginUser, logoutUser, registerUser, updateUser } from '../controllers/user.controller.js'
import isLoggedIn from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/get').get(isLoggedIn,getUser)
router.route('/update').patch(isLoggedIn,updateUser)
router.route('/logout').get(logoutUser)

export default router