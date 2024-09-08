const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  
  console.log(token);
  if (!token) {
    return res.status(401).send('Please Login first to perform such operation!');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Access Denied!');
    }
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;
