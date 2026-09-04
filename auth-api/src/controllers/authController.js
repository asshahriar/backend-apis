const registerUser = (req, res) => {
	console.log(req.body);

	res.json({
		message: "Register controller is working"
	})
}


export {registerUser}