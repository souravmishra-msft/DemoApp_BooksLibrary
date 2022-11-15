const WishlistItem = require('../models/WishlistData');
const Book = require('../models/Book');

const getWishlistItems = async (req, res) => {
    let scp = req.authInfo["scp"];
    let scopeArr = scp.split(" ").filter(Boolean); // Add a error handler if the scope is not available
    let appRoles = req.authInfo.roles;
    let items;
    try {
        if (((appRoles[0] == "buyer") || (appRoles[0] == "admin")) && (scopeArr.find(el => el === "Books.ReadMyBooks"))) {
            items = await WishlistItem.find();
            if (!items || (items.length == 0)) {
                return res.status(404).json({
                    status: 'failure',
                    message: 'No books found in your wishlist.'
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    items_count: items.length,
                    items
                });
            }
        } else {
            res.status(401).json({
                status: 401,
                message: "Unauthorized",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}


const addToWishlist = async (req, res) => {
    let scp = req.authInfo["scp"];
    let scopeArr = scp.split(" ").filter(Boolean);
    let appRoles = req.authInfo.roles;
    let buyerId = req.authInfo.oid;
    let username = req.authInfo.preferred_username;
    let item;
    try {
        if (((appRoles[0] == "buyer") || (appRoles[0] == "admin")) && (scopeArr.find(el => el === "Books.AddToWishlist"))) {
            const itemExists = await WishlistItem.findOne({ book_id: req.body.id })
            if (!itemExists || (itemExists == 0)) {
                const wishlistItem = await Book.findOne({ _id: req.body.id });
                item = new WishlistItem({
                    book_id: wishlistItem._id,
                    book_title: wishlistItem.title,
                    book_image: wishlistItem.image,
                    book_genre: wishlistItem.genre,
                    buyer_id: buyerId,
                    buyer_name: username
                });

                await item.save();
                return res.status(201).json({
                    status: 'success',
                    message: 'Item added to your wishlist.'
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'Item already exits in your wishlist.',
                    item
                });
            }
        } else {
            res.status(401).json({
                status: 401,
                message: "Unauthorized",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}

const deleteWishlistItem = async (req, res) => {
    let scp = req.authInfo["scp"];
    let scopeArr = scp.split(" ").filter(Boolean); // Add a error handler if the scope is not available
    let appRoles = req.authInfo.roles;
    let id = req.body.id;
    let item;
    try {
        if (((appRoles[0] == "buyer") || (appRoles[0] == "admin")) && (scopeArr.find(el => el === "Books.DeleteBook"))) {
            item = await WishlistItem.findByIdAndRemove(id);
            if (!item || (item == 0)) {
                return res.status(500).json({
                    status: 'failure',
                    message: 'Failed to delete item from wishlist.'
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'Item deleted from wishlist successfully.'
                });
            }
        } else {
            res.status(401).json({
                status: 401,
                message: "Unauthorized",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}

exports.getWishlistItems = getWishlistItems;
exports.addToWishlist = addToWishlist;
exports.deleteWishlistItem = deleteWishlistItem;