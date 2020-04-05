import express from 'express';
// Mounted to /forums/{forum_title}/topics
const TopicController = express.Router();

TopicController.get('/')

export default TopicController;