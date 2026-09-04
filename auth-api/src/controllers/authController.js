import User from "../models/user.js";
import bcrypt from "bcrypt";
import { registerSchema } from "../validations/authValidation.js";

export const registerUser = async (req, res) => {
	try {
		const result = registerSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Invalid input",
				error: result.error.issues,
			});
		}
		const { name, email, password } = result.body;

		const existingUser = await User.findOne({ email });
		const passwordHash = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			email,
			passwordHash,
		});

		return res.status(201).json({
			message: "User registered successfully",
			user: {
				name: user.name,
				email: user.email,
			},
		});

		if (existingUser) {
			return res.status(409).json({
				message: "Email is already registered",
			});
		}
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			message: 'internal server error'
		})
	}
};
