const bcrypt = require('bcrypt-nodejs');

const bcryptService = () => {
  const password = (pass) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(pass, salt);

    return hash;
  };

  const comparePassword = (pw, hash) => (
    bcrypt.compareSync(pw, hash)
  );

  return {
    password,
    comparePassword,
  };
};

module.exports = bcryptService;
