import express from 'express'
import * as path from 'path'

const __dirname = path.resolve()

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  res.status(200)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
