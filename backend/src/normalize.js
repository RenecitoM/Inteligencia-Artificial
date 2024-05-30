function normalize(data) {
    const means = {};
    const stdDevs = {};
    const keys = Object.keys(data[0]);

    // Calcular la media de cada atributo
    keys.forEach(key => {
        const sum = data.reduce((acc, row) => acc + row[key], 0);
        means[key] = sum / data.length;
    });

    // Calcular la desviación estándar de cada atributo
    keys.forEach(key => {
        const variance = data.reduce((acc, row) => acc + Math.pow(row[key] - means[key], 2), 0) / data.length;
        stdDevs[key] = Math.sqrt(variance);
    });

    // Normalizar los datos
    return data.map(row => {
        const normalizedRow = {};
        keys.forEach(key => {
            normalizedRow[key] = (row[key] - means[key]) / stdDevs[key];
        });
        return normalizedRow;
    });
}

module.exports = normalize;
