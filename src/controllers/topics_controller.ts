import express from 'express';
import TopicService from '../services/topics_service';
import AppConstants from '../util/app_constants';
// Mounted to /forums/{forum_title}/topics
const TopicController = express.Router();

TopicController.get('/topics/:topic',(req, res) => {
    let topicId = req.query.topicId;
    let topicService = <TopicService> req.app.get(AppConstants.TOPIC_SERVICE);
   
    (async () => {
        console.log(encodeURIComponent(req.params.topic));

        console.log(topicId);
        let topic = await topicService.getTopic(topicId);
        res.render('posts',{topic: topic, title: topic.title});
     //   res.end("under construction")
    })();
});

export default TopicController;