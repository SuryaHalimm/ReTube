const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const accessToken = req.cookies['accessToken'];
  try {
    if (!accessToken) {
      return res.sendStatus(401);
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = { authenticateToken };
