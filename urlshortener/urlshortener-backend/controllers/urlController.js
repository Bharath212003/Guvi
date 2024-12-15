const Url = require('../models/Url');
const crypto = require('crypto');

exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const userId = req.user.id;

  const shortId = crypto.randomBytes(4).toString('hex');

  try {
    const url = new Url({ originalUrl, shortId, createdBy: userId });
    await url.save();

    res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (error) {
    res.status(500).json({ message: 'Error creating short URL', error: error.message });
  }
};
