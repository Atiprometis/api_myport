
const app = require('./app')

const PORT = process.env.DB_PORT || 3306;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})