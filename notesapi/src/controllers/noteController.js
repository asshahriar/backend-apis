import Note from "../models/note.js";

const createNote = async (req, res) => {
	try {
		const { title, content } = req.body;

		const note = await Note.create({
			title,
			content,
		});

		res.status(200).json(note);
	} catch (error) {
		res.status(500).json({
			message: "Failed to create a note",
			error: error.message,
		});
	}
};

const getNotes = async (req, res) => {
	try {
		const notes = await Note.find();

		res.status(200).json(notes);
	} catch (error) {
		res.status(500).json({
			message: "failed to get notes",
			error: error.message,
		});
	}
};

const getNote = async (req, res) => {
	try {
		const note = await Note.findById(
			req.params.id
		);

		if(!note) {
			res.status(404).json({
				message: "Note was not found"
			})
		}

		res.status(200).json(note)
	} catch(error) {
		res.status(500).json({
			message: "failed to get one note",
			error: error.message,
		});
	}
}


const updateNote = async (req, res) => {
	try {
		const note = await Note.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		)

		if(!note) {
			res.status(404).json({
				message: "Note was not found"
			})
		}

		res.status(200).json(note)
	}catch(error) {
		res.status(500).json({
			message: "Failed to update the note",
			error: error.message
		})
	}
}


const deleteNote = async (req, res) => {
	try{
		const note = await Note.findByIdAndDelete(
			req.params.id
		)

		if(!note){
			res.status(404).json({
				message: "Note was not found"
			})
		}

		res.status(200).json(note)
	}catch(error){
		res.status(500).json({
			message: "failed to delete the note",
			error: error.message
		})
	}
}

export {createNote, getNotes, getNote, updateNote, deleteNote}
