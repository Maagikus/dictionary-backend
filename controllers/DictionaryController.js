import Dictionary from "../models/Dictionary.js";
export const getAll = async (req, res) => {
	const dictionaryId = req.params.id
	try {
		const dictionary = await Dictionary.find({ "user": dictionaryId })
		res.json(dictionary)
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'не удалось создать словарь'
		})
	}
}
export const create = async (req, res) => {
	try {
		const doc = new Dictionary({
			word: req.body.word,
			transcription: req.body.transcription,
			translation: req.body.translation,
			audio: req.body.audio,
			user: req.userId
		})
		const dictionary = await doc.save()
		res.json(dictionary)
	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'не удалось создать словарь'
		})
	}
}
export const deleteById = async (req, res) => {
	try {
		Dictionary.findByIdAndDelete(req.params.id).then(dictionary => {
			if (!dictionary) {
				return res.status(404).send()
			}
			res.send(dictionary)
		})

	} catch (e) {
		console.log(e);
		res.status(500).json({
			message: 'не удалось удалить'
		})
	}
}
