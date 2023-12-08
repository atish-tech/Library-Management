const { addBook, removeBook, updateBook, accessAllBook, bookDetail, borrowBook, returnBook } = require('../Conroller/bookController');
const protect = require('../Middleware/authMiddleWare');

const route = require('express').Router();

// get all book
route.get('/all/books' , accessAllBook);
// get paticular book
route.get('/book/id' , bookDetail);
// borrow or return book 
route.put('/borrow/book' , borrowBook)
route.put('/return/book' , returnBook)


// add , update and delete book by librarian
route.post('/add/book' , protect , addBook);
route.put('/update/book' , protect , updateBook);
route.delete('/remove/book' , protect , removeBook);

module.exports = route;