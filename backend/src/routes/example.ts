import Router from "express-promise-router"

export const example = Router()

example.route("/")
  .get(async (req, res) => {
    const data = { "hello": "world" }
    res.status(200).json(data)
  })
