const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch data from an external API
app.get('/sc/:sc/bulan/:bulan', async (req, res) => {
    const { sc } = req.params;
    const { bulan } = req.params;
    try {
        const response = await axios.get(`https://risma.mom/json/list/${sc}.json&bulan=${bulan}`); // Example external API
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch external data' });
    }
});

// Start the server
const PORT = 3132;
app.listen(PORT, () => {
    console.log(`Server running at http://127.0.0.1:${PORT}`);
});
