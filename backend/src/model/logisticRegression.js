function logisticRegression(input) {
    // Coeficientes de la regresión (ajustados)
    const weights = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11];
    const bias = 0.05; // Sesgo de la regresión ajustado

    // Media y desviación estándar de los atributos (calculados previamente a partir de los datos de entrenamiento)
    const means = [50000, 100, 50000, 100, 1.5, 100, 100, 100, 50, 10, 10, 10];
    const stdDevs = [10000, 50, 10000, 50, 0.5, 50, 50, 50, 25, 5, 5, 5];

    // Asegurarse de que el input tiene todos los atributos necesarios
    const requiredKeys = ["Source Port", "Destination Port", "NAT Source Port", "NAT Destination Port", "Action", "Bytes", "Bytes Sent", "Bytes Received", "Packets", "Elapsed Time (sec)", "pkts_sent", "pkts_received"];
    
    for (const key of requiredKeys) {
        if (!(key in input)) {
            throw new Error(`Missing attribute: ${key}`);
        }
    }

    // Convertir el atributo "Action" a valores numéricos
    const actionValue = convertActionToNumeric(input["Action"]);

    // Copiar el input para no modificar el objeto original
    const inputCopy = { ...input, "Action": actionValue };

    // Normalizar los datos
    const normalizedInput = requiredKeys.map((key, index) => {
        return (inputCopy[key] - means[index]) / stdDevs[index];
    });

    // Calcular la suma ponderada
    let sum = bias;
    
    for (let i = 0; i < weights.length; i++) {
        sum += normalizedInput[i] * weights[i];
    }

    // Limitar la salida de la función sigmoide para grandes valores de 'sum'
    if (sum > 20) {
        return 0.9999; // Probabilidad muy alta de ser malicioso
    } else if (sum < -20) {
        return 0.0001; // Probabilidad muy baja de ser malicioso
    }

    // Calcular la probabilidad utilizando la función sigmoide
    const probability = 1 / (1 + Math.exp(-sum)); // Probabilidad de ser malicioso
    return probability;
}

// Función para convertir el atributo "Action" a valores numéricos
function convertActionToNumeric(action) {
    switch (action) {
        case 'allow':
            return 0.1;
        case 'deny':
            return 0.2;
        case 'drop':
            return 0.3;
        default:
            throw new Error('Invalid action value');
    }
}

// Exportar la función para usarla en otros archivos
module.exports = logisticRegression;