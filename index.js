const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Client app
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/openai', require('./routes/openai.routes'));

// Init
app.listen(port, () => console.log(`Server started on port http://localhost:${port}`));
