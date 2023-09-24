const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({origin: true, credentials: true}))
app.use(express.json())

const uri = process.env.MONGO_URL
const conn = mongoose.connect(uri, {useNewUrlParser: true});

const authRouter = require('./routes/authRoutes')
const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
const jobPostRouter = require('./routes/jobPostRoutes')
const groupRouter = require('./routes/groupRoutes')
const searchAndFilterRouter = require('./routes/searchAndFilterRoutes')

app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/groups', groupRouter)
app.use('/jobPosts', jobPostRouter)
app.use('/search', searchAndFilterRouter)

console.log(`MongoDB connection succesfull`)

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})
