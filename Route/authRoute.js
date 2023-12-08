const { addMember, removeMember } = require('../Conroller/bookController');
const { registerController, loginController, deleteAccount } = require('../Conroller/userController');
const protect = require('../Middleware/authMiddleWare');

const route = require('express').Router();

// Login & register as a member or librarian
route.post('/api/register' , registerController);
route.post('/api/login' , loginController);

// add and remove member as librarian by librarian
route.put('/add/librarian' , protect , addMember);
route.put('/remove/librarian' , protect , removeMember);

// delete account
route.delete('/delete/account'  , deleteAccount)

module.exports = route