class ErrorHandler {
	static serverError(res, err) {
		console.error(err)
		res.status(500).send({ message: '500 Server Error!' })
	}
}

export default ErrorHandler