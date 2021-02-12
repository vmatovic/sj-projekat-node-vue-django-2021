module.exports = {
    validateRegister: (req, res, next) => {
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

        next();
    }
};