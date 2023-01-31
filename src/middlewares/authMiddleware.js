export const authMiddleware = (req, res, next) => {
  const id = req.params.id;

  if (id==='63d300e184c92fbfdc2eee4f') {
    return next();
  }

  return res.status(401).json({ message: "Usuário não autorizado!"})

}