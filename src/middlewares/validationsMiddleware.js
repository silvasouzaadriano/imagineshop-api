export const validateFieldsRequired = (req, res, next) => {
  const { name, email, password } = req.body;

  console.log("Estou aqui")

  if (!name) {
    return res.status(400).json({ message: 'Nome é obrigatório!'})
  }

  if (!email) {
    return res.status(400).json({ message: 'Email é obrigatório!'})
  }

  if (!password) {
    return res.status(400).json({ message: 'Password é obrigatório!'})
  }

  return next();
}