import TopicDao from "../dao/topic_dao";
import Topic from "../model/topic";
import User from "../model/user";
import Forum from "../model/forum";
import Post from "../model/post";
import Avtar from "../model/avtar";

export default class TopicService {
    constructor(private topicDao: TopicDao) {

    }

    getTopic(id: number): Promise<Topic> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    let topicResult = await this.topicDao.getTopic(id);
                    let postsResult = await this.topicDao.getPostsInTopic(id);
                    
                    let user = new User();
                    user.username = topicResult[0]['USERNAME'];
                    user.email = topicResult[0]['EMAIL'];
                    user.profession = topicResult[0]['PROFESSION'];
                    user.name = topicResult[0]['NAME'];
                    user.gender = topicResult[0]['GENDER'];
                    user.setBirthday(topicResult[0]['BIRTHDAY']);
                    user.userId = topicResult[0]['USER_ID'];
                    
                    let forum = new Forum();
                    forum.title = topicResult[0]['FORUM_TITLE'];
                    forum.description =  topicResult[0]['FORUM_DESCRIPTION'];
                    forum.setCreatedDate(topicResult[0]['FORUM_CREATED_DATE']);
                    forum.forumId = topicResult[0]['FORUM_ID'];
                    
                    let topic = new Topic();
                    topic.topicId = topicResult[0]['TOPIC_ID'];
                    topic.title = topicResult[0]['TOPIC_TITLE'];
                    topic.description = topicResult[0]['TOPIC_DESCRIPTION'];
                    topic.createdBy = user;
                    topic.setCreatedDate(topicResult[0]['TOPIC_CREATED_DATE']);
                    topic.forum = forum;
                   
                    topic.posts = []
                    for (let i = 0; i < postsResult.length; i++) {

                        let avtar = new Avtar();
                        avtar.id =  postsResult[i]['AVTAR_ID'];
                        avtar.filename =  postsResult[i]['IMAGE_URL'];

                        let user = new User();
                        user.username = postsResult[i]['USERNAME'];
                        user.email = postsResult[i]['EMAIL'];
                        user.profession = postsResult[i]['PROFESSION'];
                        user.name = postsResult[i]['NAME'];
                        user.gender = postsResult[i]['GENDER'];
                        user.setBirthday(postsResult[i]['BIRTHDAY']);
                        user.userId = postsResult[i]['USER_ID'];
                        user.avtar = avtar;
                        let post = new Post();
                        post.postId = postsResult[i]['POST_ID'];
                        post.content = postsResult[i]['CONTENT'];
                        post.postedBy = user;
                        post.setPostedDate(postsResult[i]['DATE_POSTED']);
                        topic.posts.push(post);
                    }
                    resolve(topic);
                } catch (error) {
                    reject(error);
                }
            })();
        });
    }

}