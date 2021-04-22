require('dotenv').config();
const path = require('path');

const storage =  path.join(__dirname, "storage");
if (!storage) {
  console.error(
    'Storage path not defined,',
    'set a value for STORAGE environment variable'
  );
  process.exit(1);
}

module.exports = storage;
