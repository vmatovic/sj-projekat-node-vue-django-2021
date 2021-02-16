const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./routes');
const path = require('path');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRouter);

const staticDir = express.static(path.join(__dirname, 'dist'));

app.use(staticDir);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(2999, () => {
    console.log('Port 2999 aktivan');
});
