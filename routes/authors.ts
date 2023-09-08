import express from "express"
import Author from "../models/Author"

const authors = express.Router()

authors.get("/", async (req, res) => {
    const result = await Author.find()
    res.send(result)
})

export default authors