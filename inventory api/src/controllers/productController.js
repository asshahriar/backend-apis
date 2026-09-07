import Product from "../models/product.js";

const createProduct = async (req, res) => {
	try{
		const {name, price, quantity} = req.body

		const product = await Product.create({
			name,
			price,
			quantity
		})

		res.status(201).json(product)
	}catch (error){
		res.status(500).json({
			message: "Failed to create product",
			error: error.message,
		})
	}
}


const getProducts = async (req, res) => {
	try {
		const products = await Product.find()

		res.status(200).json(products)
	} catch(error) {
		res.status(500).json({
			message: "Failed to get all products",
			error: error.message
		})
	}
}


const updateProduct = async (req, res) => {
	try{
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
		)

		if(!product) {
			res.status(404).json({
				message: "Product not found"
			})
		}

		res.status(200).json(product)
	} catch(error) {
		res.status(500).json({
			message: "Failed to update product",
			error: error.message
		})
	}
}


const deleteProduct = async (req, res) => {
	try{
		const product = await Product.findByIdAndDelete(
			req.params.id
		);

		if(!product) {
			return res.status(404).json({
				message: "product not found"
			})
		}

		res.status(200).json(product)
	} catch(error) {
		res.status(500).json({
			message: "Failed to delete product",
			error: error.message
		})
	}
}


export {createProduct, getProducts, updateProduct, deleteProduct};