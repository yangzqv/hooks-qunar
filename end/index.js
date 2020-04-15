const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.status(200)
  response.send('Hello Express!')
  response.end()
})

app.get('/rest', (request, response) => {
  response.json({
    result: 1,
    msg: 'Hello Express!'
  })
})

app.listen(5000)
