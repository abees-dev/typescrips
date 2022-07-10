import mongoose from 'mongoose'

export const dbConnect = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECT_STRING as string)
		console.log('Connected to mongodb')
	} catch (error) {
		throw new Error(error.message)
	}
}
