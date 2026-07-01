const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./src/api/routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app; // For testing
