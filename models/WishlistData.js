const mongoose = require('mongoose');

const WishlistDataSchema = new mongoose.Schema({
    book_id: {
        type: String,
        require: true
    },
    book_title: {
        type: String,
        require: true
    },
    book_image: {
        type: String,
        require: true
    },
    book_author: {
        type: String,
        require: true
    },
    book_genre: {
        type: String,
        require: true
    },
    buyer_id: {
        type: String,
        require: true
    }
}, { timestamps: true, collection: 'WishlistData' });

module.exports = mongoose.model('WishlistDataModel', WishlistDataSchema);