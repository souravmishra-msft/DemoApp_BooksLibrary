const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    isbn: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    published: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seller_id: {
        type: String,
        required: true
    },
    seller_username: {
        type: String,
        required: true
    },
    available_quantity: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true, collection: 'Books' });

module.exports = mongoose.model('Book', BookSchema);