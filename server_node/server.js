const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const apiRouter = require('./routes');
const path = require('path');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'Radi nesto'
    });
});

const staticDir = express.static(path.join(__dirname, 'dist'));

app.use(staticDir);
app.use(history);
app.use(staticDir);

app.listen(2999, () => {
    console.log('Port 2999 aktivan');
});
