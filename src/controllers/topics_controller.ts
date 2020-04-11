import express from 'express';
import TopicService from '../services/topics_service';
import AppConstants from '../util/app_constants';
import TopicDao from '../dao/topic_dao';
import Topic from '../model/topic';
import Forum from '../model/forum';
import User from '../model/user';
import Post from '../model/post';
import PostDao from '../dao/post_dao';
// Mounted to /forums/{forum_title}/topics
const TopicController = express.Router();

TopicController.get('/topics/:topic',(req, res) => {
    let topicId = req.query.topicId;
    let topicService = <TopicService> req.app.get(AppConstants.TOPIC_SERVICE);
   
    (async () => {
        let topic = await topicService.getTopic(topicId);
        res.render('posts',{topic: topic, title: topic.title});
    })();
});

TopicController.post('/topics', (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let forumId = req.body.forumId;
    if (req.session) {
        let userId = req.session.userSession.user.userId;
        let topicsDao = <TopicDao> req.app.get(AppConstants.TOPIC_DAO);
        let forum = new Forum();
        forum.forumId = forumId;
        let user = new User();
        user.userId = userId;
        let topic = new Topic();
        topic.title = title;
        topic.description = description;
        topic.createdBy = user;
        topic.forum = forum;
        (async () => {
           try {
            let topicId = await topicsDao.postTopic(topic);
            res.redirect(`/topics/${encodeURIComponent(title)}?topicId=${topicId}`);
           } catch (error) {
            console.log(error);
           }
        })();
    }
});
TopicController.post('/topics/:topic/posts', (req, res) => {
    let content = req.body.content;
    let topicId = req.body.topicId;
    let topicTitle = req.params.topic;
    if (req.session) {
        let userId = req.session.userSession.user.userId;
        let user = new User();
        user.userId = userId;
        let topic = new Topic();
        topic.topicId = topicId;
        let post = new Post();
        post.topic = topic;
        post.postedBy = user;
        post.content = content;
        let postDao = <PostDao> req.app.get(AppConstants.POST_DAO);
        (async ()=> {
            try {
                let result = await postDao.postReply(post);
                res.redirect(`/topics/${encodeURIComponent(topicTitle)}?topicId=${topicId}`);
            } catch (error) {
                console.log(error);
            }
        })()
    }
})
export default TopicController;