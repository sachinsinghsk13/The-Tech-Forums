import express from 'express';
import ForumService from '../services/forums_service';
import AppConstants from '../util/app_constants';
const ForumController = express.Router();

ForumController.get('/forums',(req, res) => {
    let forumService = <ForumService> req.app.get(AppConstants.FORUM_SERVICE);
    (async function() {
        let categories = await forumService.getAllForums();
        res.render('index',{title: 'The Tech Forums',categories: categories});
    })();
});

ForumController.get('/forums/:forumTitle', (req, res) => {
    let forumId = req.query.forumId;
    let forumService = <ForumService> req.app.get(AppConstants.FORUM_SERVICE);
    (async function() {
        let forum = await forumService.getForum(forumId);
        res.render('topics',{title: forum.title, forum: forum});
    })();
});

export default ForumController;