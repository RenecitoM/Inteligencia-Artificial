const express = require('express');
const router = express.Router();
const { getData } = require('./controllers/dataController');
const { predictAttack } = require('./model/predictionModel');
const jsonParser = require('./middleware/bodyParser');

router.get('/data', getData);

router.post('/predict', jsonParser, (req, res) => {
    const inputData = req.body;
    const prediction = predictAttack(inputData);
    const predictionResult = (prediction * 100).toFixed(2) + '%';
    res.json({ predictionResult });
});

module.exports = router;