const jwt = require('jsonwebtoken');
const db = require('../db');
const Joi = require('joi');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(2).max(50).required(),
    email: Joi.string().required().min(4).max(50),
    password: Joi.string().required().min(5).max(100),
    password_confirmation: Joi.string().required().min(5).max(100)
});

module.exports = {
    validateRegister: (req, res, next) => {
        console.log(req.body);
        const result = schema.validate(req.body);
        if (result.error != null) {
            return res.status(400).send({
                msg: 'Neispravan sign-up'
            });
        }

        if (!req.body.username && req.body.username < 2) {
            return res.status(400).send({
                msg: 'Molimo unesite Vas korisnicki naziv sa vise od 2 karaktera.'
            });
        }

        if (!req.body.email && req.body.email < 4) {
            return res.status(400).send({
                msg: 'Molimo unesite Vas e-mail sa vise od 4 karaktera.'
            });
        }

        if (!req.body.password && req.body.password < 5) {
            return res.status(400).send({
                msg: 'Molimo unesite Vasu sifru sa vise od 5 karaktera.'
            });
        }

        if (!req.body.password_confirmation && req.body.password != req.body.password_confirmation) {
            return res.status(400).send({
                msg: 'Oba dve sifre se moraju poklopiti.'
            });
        }
        console.log('usao');
        next();
    },

    isLoggedIn: (req, res, next) => {
        try {
            //const token = req.headers.authorization.split(' ')[1];
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, 'SECRETKEY');
            req.userData = decoded;
            next();
        } catch (error) {
            return res.status(401).send({
                msg: 'Sesija nije validna'
            });
        }
    },

    mozeMaterijal: (req, res, next) => {
        db.query(`SELECT preostala_duzina FROM materijali WHERE materijalID = ${req.params.id}`,
        (err, result) => {
            if (err) {
                throw err;
            }
            if (!result) {
                return res.status(401).send({
                    msg: 'Nepostojeci materijal.'
                });
            }
            var { preostala_duzina } = result[0];
            const num = parseInt(preostala_duzina);
            const order = parseInt(req.body.amt);

            if (order < 0) {
                return res.status(200).send({
                    msg: 'Ne moze negativan broj.'
                });
            }

            if (order > num) {
                return res.status(200).send({
                    msg: 'Prekoracili ste granicu.'
                });
            }
            next();
        });
    },

    mozeDugme: (req, res, next) => {
        db.query(`SELECT kolicina FROM dugmici WHERE dugmiciID = ${req.params.id}`,
        (err, result) => {
            if (err) {
                throw err;
            }
            if (!result) {
                return res.status(401).send({
                    msg: 'Nepostojece dugme.'
                });
            }
            var { kolicina } = result[0];
            const num = parseInt(kolicina);
            const order = parseInt(req.body.amt);

            if (order < 0) {
                return res.status(200).send({
                    msg: 'Ne moze negativan broj.'
                });
            }

            if (order > num) {
                return res.status(200).send({
                    msg: 'Prekoracili ste granicu.'
                });
            }
            next();
        });
    },

    mozeNamestaj: (req, res, next) => {
        db.query(`SELECT preostala_duzina FROM materijali_namestaj WHERE m_namestajID = ${req.params.id}`,
        (err, result) => {
            if (err) {
                throw err;
            }
            if (!result) {
                return res.status(401).send({
                    msg: 'Nepostojeci mebl.'
                });
            }
            var { preostala_duzina } = result[0];
            const num = parseInt(preostala_duzina);
            const order = parseInt(req.body.amt);

            if (order < 0) {
                return res.status(200).send({
                    msg: 'Ne moze negativan broj.'
                });
            }

            if (order > num) {
                return res.status(200).send({
                    msg: 'Prekoracili ste granicu.'
                });
            }
            next();
        });
    }
};