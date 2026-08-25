import express from "express"
import noteRoutes from "./routes/noteRoutes.js"

const app = express();


app.use(express.json())
app.use("/api/notes", noteRoutes)


app.get("/", (req, res) => {
	res.json({
		message: "Notes API is Running"
	})
})







export default app;