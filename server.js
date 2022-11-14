const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require("cors");
const passport = require('passport');

//Load main config file
dotenv.config({ path: './config/main.env' });

// Include routes
const bookRoutes = require('./routes/book-routes');

// ----------------------------------------------------
// Configure the Express App. Include the middlewares
// ----------------------------------------------------
const app = express();
const PORT = process.env.PORT;

// ------------------------------------------------------
// Connecting to MongoDB-Atlas using mongoose
// ------------------------------------------------------
const db = process.env.DB_CONNECT;
mongoose.connect(db)
    .then(() => console.log(`API Server connected to DB successfully....`))
    .catch((err) => console.log(err));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'application/json' }));

// Initialize Passport
app.use(passport.initialize());

// Enable CORS (for local testing only - remove in production/deployment)
app.use(cors());

// Routes
app.use('/api/v1/books', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 