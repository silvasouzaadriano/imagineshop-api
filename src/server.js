import express from 'express'

import { User } from './User.js'

const app = express()
const port = 5000


app.get('/', (req, res) => {
  const user = new User('Adriano', 'adriano@imagineon.com.br')

  const user2 = new User('Francisco', 'francisco@imagineon.com.br')

  console.log(user2)

  user2.name = 'João'

  console.log(user2)
  console.log(user)

  console.log(user.getFullName())
  console.log(user2.getFullName())

  user.name = 'Janon'

  console.log(user.getFullName())

  res.send('IMAGINE SHOP')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})