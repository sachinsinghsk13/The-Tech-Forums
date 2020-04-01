import express from 'express';
const MainController = express.Router();

MainController.get('/', (req, res) => {
    res.render('index', {title: 'The Tech Forums'});
});

export default MainController;