import express from 'express';
import ForumService from '../services/forums_service';
import AppConstants from '../util/app_constants';
const ForumController = express.Router();

ForumController.get('/forums',(req, res) => {
    let forumService = <ForumService> req.app.get(AppConstants.FORUM_SERVICE);
    (async function() {
        let categories = await forumService.getAllForums();
        res.render('index',{title: 'The Tech Forums`',categories: categories, pageTitle: 'All Forums'});
    })();
});

ForumController.get('/forums/:forumTitle', (req, res) => {
    let forumTitle = req.params.forumTitle;
    let forumId = req.query.forumId;
    console.log(forumTitle, forumId);
    res.end("working");
});

export default ForumController;