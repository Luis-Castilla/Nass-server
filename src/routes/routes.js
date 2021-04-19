const express = require('express');
const router = express.Router(); //En este objeto definimos la rutas de nuestro servidor
const passport = require('passport');

router.get('/', (req, res, next) => { //lo primero que el servidor recibe es el / request respone next
    res.status(200).send({ "mensaje": "Server CheckApp running" })
});

module.exports = router;