const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'eeea6b3203fc4973aadfe8b2c9beae97'
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => res.json(entries[0]))
	.catch(err => res.status(400).json('error getting entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}