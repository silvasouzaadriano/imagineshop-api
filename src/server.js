import 'dotenv/config';
import express, { request } from 'express'
import jwt from 'jsonwebtoken';
import multer from 'multer';
import crypto from 'crypto';
import { extname } from 'path';
import cors from 'cors';


import { validateFieldsRequired } from './middlewares/validationsMiddleware.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import { ProductService } from './services/product-service.js';
import { UserService } from './services/user-services.js';



const app = express()
const port = process.env.PORT || 8080

const storage = multer.diskStorage(
  {
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      const newFilename = crypto.randomBytes(32).toString('hex');
      const fileExtension = extname(file.originalname);
      cb(null, `${newFilename}${fileExtension}`);
    }
  }
);

const uploadMiddleware = multer({ storage });

app.use(cors());
app.use(express.json())
app.use(express.urlencoded( {extended: true }));

app.get('/', async (req, res) => {
  res.send('IMAGINE SHOP')
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userService = new UserService();
  const userLogged = await userService.login(email, password);

  if (userLogged) {
    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign({ user: userLogged }, secretKey, { expiresIn: "1d"})
    return res.status(200).json({ token } );
  }
  return res.status(400).json({ message: "E-mail ou senha inválidos!"});
})

app.post('/users', validateFieldsRequired, async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  await userService.create(user);
  return res.status(201).json(user);
})


app.get('/products', async (req, res, next) => {
  const productService = new ProductService();
  const products = await productService.findAll();
  return res.status(200).json(products)
})

app.get('/products/:id',  async (req, res) => {
  const id = req.params;
  const productService = new ProductService();
  const product = await productService.findById(id);
  if (product) {
    return res.status(200).json(product);
  }
  return res.status(404).json({ message: 'Produto não encontrado!'});
})

app.use('/uploads', express.static('uploads'));

app.use(authMiddleware);

app.get('/users', async (req, res, next) => {
  const userService = new UserService();
  const users = await userService.findAll();
  return res.status(200).json(users)
})

app.get('/users/:id',  async (req, res) => {
  const id = req.params;
  const userService = new UserService();
  const user = await userService.findById(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: 'Usuário não encontrado!'});
})

app.put('/users/:id', async (req, res) => {
  const id = req.params;
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  const findUser = await userService.findById(id);
  if (findUser) {
    await userService.update(id, user);
    return res.status(200).json({ message: 'Usuário atualizado com sucesso!'});
  }
  return res.status(404).json({ message: 'Usuário não encontrado!'});
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params;
  const userService = new UserService();
  const user = await userService.findById(id);
  if (user) {
    await userService.delete(id);
    return res.status(200).json({ message: 'Usuário excluído com sucesso!'});
  }
  return res.status(404).json({ message: 'Usuário não encontrado!' });
})

app.post('/products', uploadMiddleware.single('image'), async (req, res) => {
  const { name, description, price, summary, stock } = req.body;
  const fileName = req.file.filename
  const product = { name, description, price, summary, stock, fileName };
  const productService = new ProductService();
  await productService.create(product);
  return res.status(201).json(product);
})


app.listen(port, () => {
  console.log(`ImagineShop app listening on port ${port}`)
})