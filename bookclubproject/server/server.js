const express = require("express")
const cors = require("cors")
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser(),express.json(), express.urlencoded({ extended: true }), cors());
require("dotenv").config()
require("./config/mongoose.config")

const port = process.env.PORT

const Routes = require("./routes/user.route")
const bookRoutes=require("./routes/book.route")
Routes(app)
bookRoutes(app)

app.listen(port, () => {
    console.log(`Server is running on Port ${port}`)
})