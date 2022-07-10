require('dotenv').config()
import cookieParser from 'cookie-parser'
import express from 'express'
import { dbConnect } from './config/dbConnect'
import BaseRouter from './routes/api'

const main = async () => {
	const app = express()

	app.use(cookieParser())
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))

	const PORT = process.env.PORT || 3080
	await dbConnect()

	app.use('/api', BaseRouter)
	app.listen(PORT, () =>
		console.log(`Serving on port ${PORT}: http://localhost:${PORT}`)
	)
}

main().catch((err) => {
	throw new Error(err.message)
})
