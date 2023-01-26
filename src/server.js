import 'dotenv/config';
import express from 'express'
import { ReturnDocument } from 'mongodb';

import { UserService } from './services/user-services.js';

const app = express()
const port = 3333

app.use(express.json())


app.get('/', async (req, res) => {
  res.send('IMAGINE SHOP')
})

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  await userService.create(user);
  return res.status(201).json(user);
})

app.get('/users', async (req, res) => {
  const userService = new UserService();
  const users = await userService.findAll();
  return res.status(200).json(users)
})

app.get('/users/:id', async (req, res) => {
  const id = req.params;
  const userService = new UserService();
  const user = await userService.findById(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: 'Usuário não encontrado'});
})


app.listen(port, () => {
  console.log(`ImagineShop app listening on port ${port}`)
})