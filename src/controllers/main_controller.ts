import express from 'express';
import AppConstants from '../util/app_constants';
import ForumDao from '../dao/forum_dao';
import ForumService from '../services/forums_service';
const MainController = express.Router();

MainController.get('/', (req, res) => {
    res.redirect('/forums');
});
export default MainController;