import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MONGODB Connected");
		app.listen(PORT, () => {
			console.log("server is up and running");
		});
	})
	.catch((error) => {
		console.log("MongoDB connection faileid");
		(console.log(error.message), process.exit(1));
	});
