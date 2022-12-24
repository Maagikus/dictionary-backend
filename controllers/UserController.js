import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'
import userModel from '../models/User.js'
export const register = async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(402).json({
				massage: errors
			})
		}
		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const hash = await bcrypt.hash(password, salt)
		const doc = new userModel({
			email: req.body.email,
			passwordHash: hash,
			fullName: req.body.fullName,
			avatarUrl: req.body.AvatarUrl,
		})
		const user = await doc.save()
		const token = jwt.sign(
			{
				_id: user._id
			},
			'secret123',
			{
				expiresIn: '30d'
			})
		const { passwordHash, ...userData } = user._doc

		res.json({
			...userData,
			token,
		})
	} catch (error) {
		console.log(error);
		res.status(500).json(error)
	}

}
export const login = async (req, res) => {
	try {
		const user = await userModel.findOne({ email: req.body.email })
		if (!user) {
			return res.status(404).json({
				message: `can find user with email ${req.body.email}`
			})
		}
		const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
		if (!isValidPass) {
			return res.status(404).json({
				message: `password was wrong`
			})
		}
		const token = jwt.sign(
			{
				_id: user._id
			},
			'secret123',
			{
				expiresIn: '30d'
			})
		const { passwordHash, ...userData } = user._doc

		res.json({
			...userData,
			token,
		})
	} catch (error) {
		console.log(error);
		res.status(500).json(error)
	}
}
export const getMe = async (req, res) => {
	try {
		const user = await userModel.findById(req.userId)
		if (!user) {
			res.status(404).json({
				message: "cant find user"
			})
		}
		const { passwordHash, ...userData } = user._doc

		res.json(userData)
	} catch (error) {
		console.log(error);
		res.status(500).json(error)
	}
}