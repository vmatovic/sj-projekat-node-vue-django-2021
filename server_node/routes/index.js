const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../db');
const userMiddleware = require('../midware/users.js');

router.get('/', (req, res, next) => {
    res.json({ test: "test" });
});

router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {});
router.post('/login', (req, res, next) => {});

router.get('/secret', (req, res, next) => {
    res.send('Hipoteticki, samo bi ulogovani korisnici trebali to da vide.');
});

module.exports = router;