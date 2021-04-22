const fs = require('fs');

const checkDir = (storagePath) => {
    try {
        fs.accessSync(storagePath)
        return false;
    } catch (error) {
        return true;
    }

}

const createDir = (storagePath) => {
    try {
        fs.mkdirSync(storagePath);
    } catch (error) {
        console.log('error?');
        return error;
    }
}

module.exports = {
    checkDir,
    createDir
}