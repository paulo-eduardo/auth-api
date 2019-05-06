const handleRegister = (req, res, db, bcrypt) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json("usuario and password are required!");
  }

  const hash = bcrypt.hashSync(password);
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        usuario: usuario
      })
      .into("login")
      .returning("*")
      .then(login => {
        res.status(200).json(`Usuario criado com sucesso`);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister: handleRegister
};
