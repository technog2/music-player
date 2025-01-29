function serverError(res, err) {
	console.error('Error ', err) // log error if error exist
	res.status(500).json({ // send status 500 to the client
		ok: false,
		data: {
			message: 'Internal server error',
		},
	})
}

export default serverError