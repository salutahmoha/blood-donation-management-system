const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const { Email } = user;

  const accessToken = sign(
    { Email: Email },
    "jwt-access-token-secret-key",
    { expiresIn: "2m" } // Updated expiresIn to 2 minutes
  );

  const refreshToken = sign(
    { Email: Email },
    "jwt-refresh-token-secret-key",
    { expiresIn: "1d" }
  );

  return { accessToken, refreshToken };
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    if (renewToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Token" });
      } else {
        req.Email = decoded.Email;
        next();
      }
    });
  }
};

const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.json({ valid: false, message: "No Refresh token" });
  } else {
    jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Refresh Token" });
      } else {
        const newAccessToken = jwt.sign({ Email: decoded.Email }, "jwt-access-token-secret-key", { expiresIn: '2m' });
        res.cookie('accessToken', newAccessToken, { maxAge: 120000 }); // Updated maxAge to 2 minutes in milliseconds
        return true;
      }
    });
  }
};

module.exports = { createTokens, validateToken };
