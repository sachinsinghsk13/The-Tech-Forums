import TopicDao from "../dao/topic_dao";
import Topic from "../model/topic";
import User from "../model/user";
import Forum from "../model/forum";
import Post from "../model/post";

export default class TopicService {
    constructor(private topicDao: TopicDao) {

    }

    getTopic(id: number): Promise<Topic> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    let topicResult = await this.topicDao.getTopic(id);
                    let postsResult = await this.topicDao.getPostsInTopic(id);
                    console.log(topicResult);
                    let user = new User(topicResult[0]['USERNAME'], topicResult[0]['EMAIL'], topicResult[0]['PROFESSION'], topicResult[0]['NAME'], new Date(topicResult[0]['BIRTHDATE']), topicResult[0]['GENDER'], topicResult[0]['USER_ID']);
                    let forum = new Forum(topicResult[0]['FORUM_TITLE'], topicResult[0]['FORUM_DESCRIPTION'], topicResult[0]['FORUM_CREATED_DATE'], topicResult[0]['FORUM_ID']);
                    let topic = new Topic(topicResult[0]['TOPIC_ID'], topicResult[0]['TOPIC_TITLE'], topicResult[0]['TOPIC_DESCRIPTION'], user, topicResult[0]['TOPIC_CREATED_DATE'], forum);
                    if (topicResult.length) {

                    }
                    topic.posts = []
                    for (let i = 0; i < postsResult.length; i++) {
                        let user = new User(postsResult[i]['USERNAME'], postsResult[i]['EMAIL'], postsResult[i]['PROFESSION'], postsResult[i]['NAME'], new Date(postsResult[i]['BIRTHDATE']), postsResult[i]['GENDER'], postsResult[i]['USER_ID']);
                        let post = new Post(postsResult[i]['POST_ID'], postsResult[i]['CONTENT'], new Date(postsResult[i]['POST_ID']), user);
                        topic.posts.push(post);
                    }
                   console.log(topic);
                    resolve(topic);
                } catch (error) {
                    reject(error);
                }
            })();
        });
    }

}