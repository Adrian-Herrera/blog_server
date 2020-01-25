const express = require('express');
const router = express.Router();

const pool = require('../database');

router.post('/add', (req, res) => {
    res.send('Form');
});

module.exports = router;