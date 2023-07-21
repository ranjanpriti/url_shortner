const UrlModel = require('../models/urlModel');
const generateRandomString = require('../utils/randomString');

const shortenUrl = async (req, res) => {
  const { destinationUrl } = req.body;
  const shortUrl = generateShortUrl();

  try {
    await UrlModel.create({ destinationUrl, shortUrl });
    return res.status(200).json({ shortUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateShortUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const { destinationUrl } = req.body;

  try {
    const updatedUrl = await UrlModel.findOneAndUpdate(
      { shortUrl },
      { destinationUrl },
      { new: true }
    );
    if (!updatedUrl) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getDestinationUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const urlData = await UrlModel.findOne({ shortUrl });
    if (!urlData) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.redirect(urlData.destinationUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const updateExpiry = async (req, res) => {
  const { shortUrl } = req.params;
  const { daysToAdd } = req.body;

  try {
    const updatedUrl = await UrlModel.findOneAndUpdate(
      { shortUrl },
      { expiresAt: () => Date.now() + daysToAdd * 24 * 60 * 60 * 1000 },
      { new: true }
    );
    if (!updatedUrl) {
      return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

function generateShortUrl() {
  return 'www.ppa.in/' + generateRandomString(6);
}

module.exports = {
  shortenUrl,
  updateShortUrl,
  getDestinationUrl,
  updateExpiry,
};
