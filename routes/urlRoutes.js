const express = require('express');
const urlController = require('../controllers/urlController');

const router = express.Router();

router.post('/shorten', urlController.shortenUrl);
router.put('/update/:shortUrl', urlController.updateShortUrl);
router.get('/:shortUrl', urlController.getDestinationUrl);
router.put('/update-expiry/:shortUrl', urlController.updateExpiry);

module.exports = router;
