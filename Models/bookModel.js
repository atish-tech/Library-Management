const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    autherName : {type : String , require : true},
    bookName : {type : String , require : true} ,
    description : {type : String , require : true},
    isAvailble : {type : Boolean , default : true , require : true},
});

const bookModel = mongoose.model('books' , bookSchema);

module.exports = bookModel