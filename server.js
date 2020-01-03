const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors')

const app = express();

// Connect DB
connectDB();

// Cors
app.use(cors());

// Init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        // look into the current folder, then client, then build and
        // then load index file
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
