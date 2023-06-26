const jwt = require('jsonwebtoken');

const secret = process.env.NODE_ENV === 'development' ? process.env.JWT_SECRET : 'f15aa369bc47855f8b2a5e227b93b721d4df4fd41eff9bdf2c9247ca325c514f';
const authService = () => {
  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: 10800 });
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify,
  };
};

module.exports = authService;
