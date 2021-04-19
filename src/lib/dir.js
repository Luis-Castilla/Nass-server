const fs = require('fs');

const checkDir = (storagePath) => {
    try {
        fs.access(storagePath, (error) => {
            if (error) {
                return false;
            }
        });
        return true;
    } catch (error) {
        return false;
    }

}

const createDir = (storagePath) => {
    try {
        console.log(storagePath);
        fs.mkdirSync(storagePath);
        console.log('error?');
    } catch (error) {
        return error;
    }
}

module.exports = {
    checkDir,
    createDir
}