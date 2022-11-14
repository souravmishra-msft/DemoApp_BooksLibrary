const Book = require('../models/Book');



const listBooks = async (req, res) => {
    console.log(req.authInfo);
    let scp = req.authInfo["scp"];
    let scopeArr = scp.split(" ").filter(Boolean); // Add a error handler if the scope is not available
    let appRoles = req.authInfo.roles;
    let books;
    try {
        if (appRoles) {
            if (((appRoles[0] == "buyer") || (appRoles[0] == "seller") || (appRoles[0] == "admin")) && (scopeArr.find(el => el === "Books.ListAllBooks"))) {
                books = await Book.find();
                if (!books || (books.length == 0)) {
                    return res.status(404).json({
                        status: 'failure',
                        message: 'No books found.'
                    });
                } else {
                    return res.status(200).json({
                        status: 'success',
                        books_count: books.length,
                        books
                    });
                }
            } else {
                res.status(401).json({
                    status: 401,
                    message: "Unauthorized",
                });
            }
        } else {
            res.status(401).json({
                status: 401,
                message: "Unauthorized! You need to be a buyer to use this functionality.",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
}

const addBook = async (req, res) => {
    let scp = req.authInfo["scp"];
    let scopeArr = scp.split(" ").filter(Boolean);
    let appRoles = req.authInfo.roles;
    const { isbn, title, image, description, published, publisher, author, genre, language, price, available } = req.body;
    let book;
    try {
        if (((appRoles[0] == "seller") || (appRoles[0] == "admin")) && (scopeArr.find(el => el === "Books.AddNewBook"))) {
            book = new Book({
                isbn,
                title,
                image,
                author,
                description,
                published,
                publisher,
                genre,
                language,
                price,
                available
            });

            await book.save();

            if (!book || (book == 0)) {
                return res.status(500).json({
                    status: 'failure',
                    message: 'Unable to add the book.'
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'added successfully.',
                    book
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

const getBook = async (req, res) => {
    let scp = req.authInfo["scp"];
    let scopeArr = scp.split(" ").filter(Boolean);
    let appRoles = req.authInfo.roles;
    const id = req.params.id;
    let book;
    try {
        if (((appRoles[0] == "seller") || (appRoles[0] == "buyer") || (appRoles[0] == "admin")) && (scopeArr.find(el => el === "Books.ListAllBooks"))) {
            book = await Book.findById(id);
            if (!book || (book.length == 0)) {
                return res.status(404).json({
                    status: 'failure',
                    message: 'No book found.'
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    book
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

const updateBook = async (req, res) => {
    let scp = req.authInfo["scp"];
    let scopeArr = scp.split(" ").filter(Boolean);
    let appRoles = req.authInfo.roles;
    const id = req.params.id;
    const { isbn, title, image, description, published, publisher, author, genre, language, price, available } = req.body;
    let book;
    try {
        if (((appRoles[0] == "seller") || (appRoles[0] == "admin")) && (scopeArr.find(el => el === "Books.UpdateBookDetails"))) {
            book = await Book.findByIdAndUpdate(id, {
                isbn,
                title,
                image,
                author,
                description,
                published,
                publisher,
                genre,
                language,
                price,
                available
            });

            book = await Book.findById(id);
            if (!book || (book == 0)) {
                return res.status(500).json({
                    status: 'failure',
                    message: 'Failed to update book details.'
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'updated successfully.',
                    book
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
        })
    }
}

const deleteBook = async (req, res) => {
    let scp = req.authInfo["scp"];
    let scopeArr = scp.split(" ").filter(Boolean);
    let appRoles = req.authInfo.roles;
    const id = req.params.id;
    let book;
    try {
        if (((appRoles[0] == "seller") || (appRoles[0] == "admin")) && (scopeArr.find(el => el === "Books.UpdateBookDetails"))) {
            book = await Book.findByIdAndRemove(id);
            if (!book || (book == 0)) {
                return res.status(500).json({
                    status: 'failure',
                    message: 'Failed to delete book details.'
                });
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: 'deleted successfully.'
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

exports.listBooks = listBooks;
exports.getBook = getBook;
exports.addBook = addBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;