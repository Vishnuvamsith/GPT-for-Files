const express = require('express');
const axios = require('axios');
const router = express.Router();
router.post("/load", async (req, res) => {
    try {
        const { input, image } = req.body;
        const response = await axios.post('http://localhost:5000/api/vision', { input, image });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
module.exports = router;