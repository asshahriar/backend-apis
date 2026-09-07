import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config()

const PORT = process.env.PORT || 5555;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("mongodb connected");
		app.listen(PORT, () => {
			console.log(`Server is up and running`);
		});
	})
	.catch((error) => {
		console.log("MongoDB connected failied");
		console.log(error.message);
		process.exit(1);
	});
