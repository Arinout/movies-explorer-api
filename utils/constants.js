const {
  DB_ADRESS_DEV = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET_DEV = '8bd180eae08cb26671e6766da3a3061c',
  PORT = 3000,
} = process.env;

module.exports = {
  DB_ADRESS_DEV,
  JWT_SECRET_DEV,
  PORT,
};
