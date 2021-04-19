const path = require('path');
const fs = require('fs');

const moveFile = (file, storagePath) => {
  const filePath = path.join(storagePath, file.name);

  return new Promise((resolve, reject) => {
    fs.promises.access(filePath)
      .then(() => reject(new Error(`File ${file.name} already exists`)))
      .catch(() =>
        file.mv(filePath, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      );
  });
};

const deleteFile = (storagePath) => {
  try {
    fs.access(storagePath, (error) => {
      if (error) {
        return error;
      }
    });
    fs.unlinkSync(storagePath);
  } catch (error) {
    return error;
  }
}

module.exports = {
  moveFile,
  deleteFile
}
