const dotenv = require('dotenv');
dotenv.config();
module.exports={
    mongodb: {
        URI: process.env.MONGO_URI
    },
    SECRET_TOKEN: '3lt0k3n$3cr31od3d0fu$p4r4n0ob$'
};