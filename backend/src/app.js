const express = require("express")
const app = express()

const songRouter = require("./routes/songs.routes")


app.use(express.json())

app.use("/", songRouter)


module.exports = app;