import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import { registerValidator, loginValidator, DictionaryCreateValidator } from './validations/validations.js'

import checkAuth from './utils/checkAuth.js'
import * as UserController from './controllers/UserController.js'
import * as DictionaryController from './controllers/DictionaryController.js'

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log(err))

const app = express();
app.use(express.json())
app.use(cors())
app.post('/auth/register', registerValidator, UserController.register)
app.post('/auth/login', loginValidator, UserController.login)
app.get('/auth/me', checkAuth, UserController.getMe)
app.get('/dictionary/:id', DictionaryController.getAll)
app.delete('/dictionary/:id', DictionaryController.deleteById)
app.post('/dictionary', checkAuth, DictionaryCreateValidator, DictionaryController.create)



app.listen(process.env.PORT || 4444, (err) => {
	if (err) {
		return console.log(err);
	}
});
