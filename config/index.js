const publicRoutes = require('./routes/publicRoutes');

module.exports = {
  publicRoutes,
  port: process.env.PORT || '4040',
};
