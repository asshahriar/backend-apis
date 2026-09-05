import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
	// 1. Get Authorization header
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({
			message: "Authentication required",
		});
	}

	// 2. Extract Bearer and token
	const [scheme, token] = authHeader.split(" ");

	if (scheme !== "Bearer" || !token) {
		return res.status(401).json({
			message: "Invalid authorization header",
		});
	}

	// 3. Verify JWT
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// 4. Attach user information to request
		req.user = decoded;

		// 5. Continue to the next middleware/controller
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Invalid or expired token",
		});
	}
};
