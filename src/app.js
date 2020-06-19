const express = require("express")
const cors = require("cors")

const { uuid } = require("uuidv4")

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get("/repositories", (req, res) => {
  return res.json(repositories)
})

app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repo)

  return res.json(repo)
})

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params
  const { title, url, techs } = req.body

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if (repoIndex < 0) return res.sendStatus(400)

  const repo = {
    id,
    title,
    url,
    techs,
    likes: repositories[repoIndex].likes
  }

  repositories[repoIndex] = repo

  return res.json(repo)
})

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if (repoIndex < 0) return res.sendStatus(400)

  repositories.splice(repoIndex, 1)

  return res.sendStatus(204)
})

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params

  const repoIndex = repositories.findIndex(repository => repository.id === id)

  if (repoIndex < 0) return res.sendStatus(400)

  const repo = {
    ...repositories[repoIndex],
    likes: repositories[repoIndex].likes + 1
  }

  repositories[repoIndex] = repo

  return res.json(repo)
})

module.exports = app
