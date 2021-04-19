require('dotenv').config();

const storage = process.env.STORAGE;
if (!storage) {
  console.error(
    'Storage path not defined,',
    'set a value for STORAGE environment variable'
  );
  process.exit(1);
}

module.exports = storage;
