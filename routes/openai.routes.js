const express = require('express');
const { generateImage } = require('../controllers/openai.controller');
const router = express.Router();

router.post('/generate-image', generateImage);

module.exports = router;
