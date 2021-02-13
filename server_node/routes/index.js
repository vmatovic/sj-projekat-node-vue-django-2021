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

router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {

    db.query(`SELECT * FROM korisnici WHERE LOWER(username) = LOWER(${db.escape(req.body.username)});`,
        (err, result) => {
            console.log('usao');
            if (result.length) {
                return res.status(409).send({
                    msg: 'Ovaj korisnicki naziv je vec zauzet!'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        db.query(
                            `INSERT INTO korisnici (id, username, email, password, registered) VALUES ('${uuid.v4()}', ${db.escape(req.body.username)}, ${db.escape(req.body.email)}, ${db.escape(hash)}, now());`,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                }

                                return res.status(200).send({
                                    msg: 'Korisnik registrovan!'
                                });
                            }
                        );
                    }
                })
            }
    });
});



router.post('/login', (req, res, next) => {
    db.query(
        `SELECT * FROM korisnici WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
            if (err) {
                throw err;
            }

            if (!result.length) {
                return res.status(401).send({
                    msg: 'Korisnicko ime ili sifra nisu ispravni'
                });
            }

            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    if (bErr) {
                        throw bErr;
                    }

                    if (bResult) {
                        const token = jwt.sign({
                            username: result[0].username,
                            userId: result[0].id
                        },
                        'SECRETKEY', {
                            expiresIn: '7d'
                        });

                        db.query(`UPDATE korisnici SET last_login = now() WHERE id = '${result[0].id}'`);
                        return res.status(200).send({
                            msg: 'Korisnik ulogovan',
                            token,
                            user: result[0]
                        });
                    }

                    return res.status(401).send({
                        msg: 'Korisnicko ime ili sifra nisu ispravni'
                    });
                }
            );
        }
    );
});

router.get('/secret', userMiddleware.isLoggedIn, (req, res, next) => {
    res.send('Hipoteticki, samo bi ulogovani korisnici trebali to da vide.');
});

module.exports = router;