const bookModel = require('../Models/bookModel');
const userModel = require('../Models/userModel');

// Librarian access
const addBook = async (request, response) => {
    const { autherName, bookName, description } = request.body;

    if (!autherName || !bookName || !description) {
        return response.status(400).json({ message: "Empty field" });
    }

    if (await bookModel.create({
        autherName: autherName,
        bookName: bookName,
        description: description
    })) {
        return response.status(200).json({ message: "Book Added Sucessfull" });
    }
}

const updateBook = async (request, response) => {
    const { id, autherName, bookName, description, isAvailble } = request.body;

    if (await bookModel.findByIdAndUpdate(id, { autherName, bookName, isAvailble, description })) {
        return response.status(200).json({ message: "Book Updated" });
    }
    else {
        return response.status(400).json({ message: "error" });
    }
}

const removeBook = async (request, response) => {
    const { id } = request.body;

    if (await bookModel.findByIdAndDelete(id)) {
        return response.status(200).json({ message: "Book Removed from DB" });
    }
    else {
        return response.status(400).json({ message: "Book not found DB" });
    }
}

const addMember = async (request ,response) => {
    if(await userModel.findByIdAndUpdate(request.body.id , {isLibrarian : true})){
        return response.status(200).json({message : "User Added"});
    }
    else {
        return response.status(400).json({message : "Server error"});
    }
}

const removeMember = async (request ,response) => {
    if(await userModel.findByIdAndUpdate(request.body.id , {isLibrarian : false})){
        return response.status(200).json({message : "User removed"});
    }
    else {
        return response.status(400).json({message : "Server error"});
    }
}

// member access
const accessAllBook = async (request, response) => {
    return response.status(200).json(await bookModel.find());
}

const bookDetail = async (request, response) => {
    const {id} = request.body;
    const book = await bookModel.findById(id);
    if(book) {
        response.status(200).json(book);
    }
    
    else {
        return response.status(400).json({message : "Book Not Found"});
    }
}

const borrowBook = async (request ,response) => {
    if(await bookModel.findByIdAndUpdate(request.body.id , {isAvailble : false})) {
        return response.status(200).json({message : "book Updated"});
    }
    else {
        return response.status(400).json({message : "server error"});
    }
}

const returnBook = async (request ,response) => {
    if(await bookModel.findByIdAndUpdate(request.body.id , {isAvailble : true})) {
        return response.status(200).json({message : "book Updated"});
    }
    else {
        return response.status(400).json({message : "server error"});
    }
}

module.exports = { addBook, removeBook, updateBook, accessAllBook, bookDetail , borrowBook , returnBook , addMember , removeMember};