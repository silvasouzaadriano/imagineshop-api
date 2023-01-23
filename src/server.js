import 'dotenv/config';
import express from 'express'

import { UserService } from './services/user-services.js';

const app = express()
const port = 3333


app.get('/', async (req, res) => {
  const userService = new UserService()


  const user = {
    name: 'Cristian',
    email: 'cristian@imagine.com.br',
    password: '123456'
  }

  await userService.add(user)

  res.send('IMAGINE SHOP')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})