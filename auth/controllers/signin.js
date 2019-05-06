const jwt = require("jsonwebtoken");

const redis = require("redis");

const redisClient = redis.createClient(process.env.REDIS_URI);

const signToken = username => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, "JWT_SECRET_KEY", { expiresIn: "2 days" });
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = user => {
  const { usuario, id } = user;
  const token = signToken(usuario);
  return setToken(token, id)
    .then(() => {
      return { success: "true", userId: id, token };
    })
    .catch(console.log);
};

const handleSignin = (db, bcrypt, req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return Promise.reject("incorrect form submission");
  }
  return db
    .select("*")
    .from("login")
    .where("usuario", "=", usuario)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return Promise.resolve(data[0]);
      } else {
        return Promise.reject("wrong credentials");
      }
    })
    .catch(err => err);
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).send("Unauthorized");
    }
    return res.json({ id: reply });
  });
};

const signinAuthentication = (db, bcrypt) => (req, res) => {
  return handleSignin(db, bcrypt, req, res)
    .then(data => createSession(data))
    .then(session => res.json(session))
    .catch(err => res.status(400).json(err));
};

module.exports = {
  signinAuthentication: signinAuthentication,
  redisClient: redisClient
};
