const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../db');
const userMiddleware = require('../midware/users.js');

const Joi = require('joi');

const commentSchema = Joi.object().keys({
    tekst: Joi.string().min(3).max(500),
    korID: Joi.string(),
    matID: Joi.number().integer()
});

const loginschema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().min(3).max(50)
});

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

    const result = loginschema.validate(req.body);

    if (result.error != null) {
        return res.status(400).send({
            msg: 'Neispravan login'
        });
    }

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

router.get('/korisnici', (req, res, next) => {
    db.query('SELECT * FROM korisnici;',
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        return res.status(200).send({
            res: result
        });
    });
});

router.get('/materijali', (req, res, next) => {
    db.query('SELECT * FROM materijali;',
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        return res.status(200).send({
            res: result
        });
    });
});

router.get('/materijal/:id', (req, res, next) => {
    db.query(`SELECT * FROM materijali where materijalID = ${req.params.id};`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        return res.status(200).send({
            res: result[0]
        });
    });
});

router.get('/dugme/:id', (req, res, next) => {
    db.query(`SELECT * FROM dugmici WHERE dugmiciID = ${req.params.id};`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        return res.status(200).send({
            res: result[0]
        });
    });
});

router.get('/namestaj/:id', (req, res, next) => {
    db.query(`SELECT * FROM materijali_namestaj WHERE m_namestajID = ${req.params.id};`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        return res.status(200).send({
            res: result[0]
        });
    });
});

router.post('/materijal/placanje/:id', userMiddleware.mozeMaterijal, (req, res, next) => {
    db.query(`INSERT INTO narudzbina (narudzbinaID, korisnikID, materijaliID, kolicina, datum_narucivanja) VALUES ('${uuid.v4()}', '${req.body.korID}', ${req.params.id}, ${req.body.amt} ,now())`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        db.query(`UPDATE materijali SET preostala_duzina = preostala_duzina - ${req.body.amt} WHERE materijalID = ${req.params.id}`,
        (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).send({
                msg: 'Uspesno!'
            });
        });
    });
});

router.post('/dugme/placanje/:id', userMiddleware.mozeDugme, (req, res, next) => {
    db.query(`INSERT INTO narudzbina (narudzbinaID, korisnikID, dugmiciID, kolicina, datum_narucivanja) VALUES ('${uuid.v4()}', '${req.body.korID}', ${req.params.id}, ${req.body.amt} ,now())`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        db.query(`UPDATE dugmici SET kolicina = kolicina - ${req.body.amt} WHERE dugmiciID = ${req.params.id}`,
        (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).send({
                msg: 'Uspesno!'
            });
        });
    });
});

router.post('/namestaj/placanje/:id', userMiddleware.mozeNamestaj, (req, res, next) => {
    db.query(`INSERT INTO narudzbina (narudzbinaID, korisnikID, m_namestajID, kolicina, datum_narucivanja) VALUES ('${uuid.v4()}', '${req.body.korID}', ${req.params.id}, ${req.body.amt} ,now())`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        db.query(`UPDATE materijali_namestaj SET preostala_duzina = preostala_duzina - ${req.body.amt} WHERE m_namestajID = ${req.params.id}`,
        (err, result) => {
            if (err) {
                throw err;
            }

            return res.status(200).send({
                msg: 'Uspesno!'
            });
        });
    });
});

router.post('/komentar', (req, res, next) => {
    
    const result = commentSchema.validate(req.body);

    if (result.error != null) {
        return res.status(400).send({
            msg: 'Neispravan komentar'
        });
    }

    db.query(`INSERT INTO komentari (komentarID, tekst, korisnikID, materijalID, postavljeno_datuma) VALUES ('${uuid.v4()}', '${req.body.tekst}', '${req.body.korID}', ${req.body.matID}, now());`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        return res.status(200).send({
            res: result[0]
        });
    });
});

router.delete('/komentar', (req, res, next) => {
    db.query(`DELETE FROM komentari WHERE komentarID LIKE '${req.body.id}'`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        return res.status(200).send({
            res: 'Obrisano'
        });
    });
});

router.get('/materijal/komentari/:id', (req, res, next) => {
    db.query(`SELECT * FROM komentari INNER JOIN korisnici ON komentari.korisnikID = korisnici.id WHERE komentari.materijalID = ${req.params.id} ORDER BY komentari.postavljeno_datuma DESC;`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        return res.status(200).send({
            res: result
        });
    });
});

router.get('/profil/komentari/:id', (req, res, next) => {
    db.query(`SELECT * FROM komentari INNER JOIN materijali ON komentari.materijalID = materijali.materijalID WHERE komentari.korisnikID LIKE '${req.params.id}' ORDER BY komentari.postavljeno_datuma DESC;`,
    (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        }

        return res.status(200).send({
            res: result
        });
    });
});

router.get('/narudzbine/materijali/:id', (req, res, next) => {
    db.query(`SELECT * FROM narudzbina INNER JOIN materijali ON narudzbina.materijaliID = materijali.materijalID WHERE narudzbina.korisnikID LIKE '${req.params.id}' ORDER BY narudzbina.datum_narucivanja DESC;`,
    (err, result) => {
        console.log('ok');
        if (err) {
            console.log(err);
            throw err;
        }
        return res.status(200).send({
            res: result
        });
    });
});

router.get('/narudzbine/dugmici/:id', (req, res, next) => {
    db.query(`SELECT dugmici.boja, narudzbina.kolicina, narudzbina.datum_narucivanja FROM narudzbina INNER JOIN dugmici ON narudzbina.dugmiciID = dugmici.dugmiciID WHERE narudzbina.korisnikID LIKE '${req.params.id}' ORDER BY narudzbina.datum_narucivanja DESC;`,
    (err, result) => {
        console.log('ok');
        if (err) {
            console.log(err);
            throw err;
        }
        return res.status(200).send({
            res: result
        });
    });
});

router.get('/narudzbine/namestaji/:id', (req, res, next) => {
    db.query(`SELECT * FROM narudzbina INNER JOIN materijali_namestaj ON narudzbina.m_namestajID = materijali_namestaj.m_namestajID WHERE narudzbina.korisnikID LIKE '${req.params.id}' ORDER BY narudzbina.datum_narucivanja DESC;`,
    (err, result) => {
        console.log('ok');
        if (err) {
            console.log(err);
            throw err;
        }
        return res.status(200).send({
            res: result
        });
    });
});

router.get('/dugmici', (req, res, next) => {
    db.query('SELECT * FROM dugmici;',
    (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).send({
            res: result
        });
    });
});

router.get('/namestaj', (req, res, next) => {
    db.query('SELECT * FROM materijali_namestaj;',
    (err, result) => {
        if (err) {
            throw err;
        }

        return res.status(200).send({
            res: result
        });
    });
});

router.get('/secret', userMiddleware.isLoggedIn, (req, res, next) => {
    res.send('Hipoteticki, samo bi ulogovani korisnici trebali to da vide.');
});

module.exports = router;