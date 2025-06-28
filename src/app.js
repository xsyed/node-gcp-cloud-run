require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../routes/user');

const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    console.log('GET /');
    res.send('Node express server on GCP cloud run');
});

app.get('/health', (req, res) => {
    console.log('GET /health');
    res.json({success: true});
});

app.use('/users', userRouter);

module.exports = app;

if (require.main === module) {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`App running on port ${port}`);
    });
}
