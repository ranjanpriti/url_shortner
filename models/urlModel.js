const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  destinationUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: () => Date.now() + 30 * 24 * 60 * 60 * 1000 }, // 30 days expiry by default
});

const UrlModel = mongoose.model('Url', urlSchema);

module.exports = UrlModel;
