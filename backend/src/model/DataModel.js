const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  sourcePort: { type: String, required: true },
  destinationPort: { type: String, required: true },
  natSourcePort: { type: String, required: true },
  natDestinationPort: { type: String, required: true },
  action: { type: String, required: true },
  bytes: { type: String, required: true },
  bytesSent: { type: String, required: true },
  bytesReceived: { type: String, required: true },
  packets: { type: String, required: true },
  elapsedTimeSec: { type: String, required: true },
  pktsSent: { type: String, required: true },
  pktsReceived: { type: String, required: true }
});

module.exports = mongoose.model('Data', dataSchema, 'data');
