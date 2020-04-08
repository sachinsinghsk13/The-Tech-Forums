import express from 'express';
const AccountsController = express.Router();

AccountsController.get('/login', (req, res) => {
    res.render('login',{title:'Login to Your Account'});
});

AccountsController.get('/register', (req, res) => {
    res.render('register',{title:'Create Account'});
});

AccountsController.post('/register', (req, res) => {
    
});

export default AccountsController;