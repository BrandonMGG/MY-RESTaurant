import express from 'express';
import {forgotPassword, resetPassword} from '../controllers/passwordController.js'
const routerPassword = express.Router();

routerPassword.post('/forgotPassword', forgotPassword);
routerPassword.put('/resetPassword/:token', resetPassword);


export default routerPassword;
