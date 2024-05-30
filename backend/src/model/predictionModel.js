const logisticRegression = require('./logisticRegression');

function predictAttack(input) {
    return logisticRegression(input);
}

module.exports = { predictAttack };