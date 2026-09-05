import User from "../models/user.js";
import bcrypt from "bcrypt";
import { registerSchema, loginSchema } from "../validations/authValidation.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
	try {
		const result = registerSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Invalid input",
				error: result.error.issues,
			});
		}
		const { name, email, password } = result.data;

		const existingUser = await User.findOne({ email });
		const passwordHash = await bcrypt.hash(password, 10);
		if (existingUser) {
			return res.status(409).json({
				message: "Email is already registered",
			});
		}
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
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			message: "internal server error",
		});
	}
};

export const loginUser = async (req, res) => {
	try {
		const result = loginSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Invalid input",
				errors: result.error.issues,
			});
		}

		const { email, password } = result.data;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				message: "Invalid email or password",
			});
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		return res.status(200).json({
			message: "Login Sucessful",
			token,
		});
	} catch (error) {
		console.error(error);

		return res.status(500).json({
			message: "Internal server error",
		});
	}
};


export const getProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId).select("-passwordHash");

		if(!user) {
			return res.status(404).json({
				message: "User not found"
			})
		}

		return res.status(200).json({
			user,
		})
	}catch(error) {
		console.error(error);
		
		return res.status(500).json({
			message: "Internal Server Error"
		})
	}
}


export const changePassword = async (req, res) => {
	try {

		const {currentPassword, newPassword} = req.body;

		const user = await User.findById(req.user.userId);

		if (!user) {
			return res.status(404).json({
				message: "User not found",
			});
		}

		const isPasswordCorrect = await bcrypt.compare(
			currentPassword,
			user.passwordHash,
		);

		const newPasswordHash = await bcrypt.hash(newPassword, 10);

		user.passwordHash = newPasswordHash;

		await user.save();

		return res.status(200).json({
			message: "Password changed successfully",
		});

	} catch(error) {
		console.error(error);


		return res.status(500).json({
			message: "Internal Server error"
		})
	}
}
