import mongoose from "mongoose";

const DictionarySchema = new mongoose.Schema({
	word: {
		type: String,
		required: true,
	},
	transcription: {
		type: String,
		unique: false,

	},
	translation: {
		type: String,
		required: true,
	},
	viewsCounter: {
		type: Number,
		default: 0,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	audio: String,
}, {
	timestamps: true
})
export default mongoose.model('Dictionary', DictionarySchema)