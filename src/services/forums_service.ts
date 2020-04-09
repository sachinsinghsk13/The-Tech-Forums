import ForumDao from "../dao/forum_dao";
import Category from "../model/category";
import Forum from "../model/forum";
import TopicDao from "../dao/topic_dao";
import Topic from "../model/topic";
import User from "../model/user";

export default class ForumService {
    constructor(private forumDao: ForumDao, private topicDao: TopicDao) {

    }

    getAllForums(): Promise<Category[]> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    let data = await Promise.all([
                        this.forumDao.getAllForumsInCategories(),
                        this.forumDao.getPostCountInForums(),
                        this.forumDao.getTopicCountInForums()
                    ]);

                    let forumResult = data[0];
                    let postResult = data[1];
                    let topicResult = data[2];

                    let postMap = new Map<number, number>();
                    let topicMap = new Map<number, number>();

                    for (let i = 0; i < postResult.length; i++) {
                        postMap.set(postResult[i]['FORUM_ID'], postResult[i]['POSTS']);
                    }
                    for (let i = 0; i < topicResult.length; i++) {
                        topicMap.set(topicResult[i]['FORUM_ID'], topicResult[i]['TOPICS']);
                    }

                    let categories = new Map<number, Category>();
                    for (let i = 0; i < forumResult.length; i++) {
                        let row = forumResult[i];
                        let categoryId = row['CATEGORY_ID'];
                        if (!categories.has(categoryId)) {
                            let c = new Category(categoryId, row['CATEGORY_NAME'], row['CATEGORY_DESCRIPTION']);
                            c.forums = [];
                            categories.set(categoryId, c);
                        }

                        let category = categories.get(categoryId);
                        let f = new Forum(row['FORUM_TITLE'], row['FORUM_DESCRIPTION'], new Date(row['DATE_CREATED']), row['FORUM_ID']);
                        if (f.forumId && topicMap.has(f.forumId)) {

                            f.totalTopics = topicMap.get(f.forumId);
                            if (postMap.has(f.forumId) && f.totalTopics != 0)
                                f.totalPosts = postMap.get(f.forumId);
                        }
                        category?.forums?.push(f);
                    }
                    let cate: Category[] = [];
                    categories.forEach(value => cate.push(value));
                    resolve(cate);
                } catch (error) {
                    reject(error);
                }
            })(); // End of async funtion
        })
    }

    getForum(id: number): Promise<Forum> {
        return new Promise((resolve, reject) => {
            (async () => {

                try {
                    let forumRow = await this.forumDao.getForum(id);
                    // get the forum 
                    let forum = new Forum(forumRow[0]['TITLE'], forumRow[0]['DESCRIPTION'], new Date(forumRow[0]['DATE_CREATED']), id);
                    let subformResult = await this.forumDao.getSubForumsInForum(id);
                    let subforumPostCountResult = await this.forumDao.getPostCountInSubforumsInForum(id);
                    let subforumTopicCountResult = await this.forumDao.getTopicCountInSubforumsInForum(id);

                    let subforumPostCountMap = new Map<number, number>();
                    for (let i = 0; i < subforumPostCountResult.length; i++)
                        subforumPostCountMap.set(subforumPostCountResult[i]['FORUM_ID'], subforumPostCountResult[i]['POSTS']);

                    let subforumTopicCountMap = new Map<number, number>();
                    for (let i = 0; i < subforumTopicCountResult.length; i++)
                        subforumTopicCountMap.set(subforumTopicCountResult[i]['FORUM_ID'], subforumTopicCountResult[i]['TOPICS']);

                    forum.subforums = []; // initialize space for subforums

                    for (let i = 0; i < subformResult.length; i++) {
                        let subforum = new Forum(subformResult[i]['TITLE'], subformResult[i]['DESCRIPTION'], new Date(subformResult[i]['DATE_CREATED']), subformResult[i]['FORUM_ID']);
                        if (subforum.forumId && subforumTopicCountMap.has(subforum.forumId)) {
                            subforum.totalTopics = subforumTopicCountMap.get(subforum.forumId);
                            if (subforumPostCountMap.has(subforum.forumId) && subforum.totalTopics != 0)
                                subforum.totalPosts = subforumPostCountMap.get(subforum.forumId);
                        }
                        forum.subforums.push(subforum);
                    }

                    let postCountResult = await this.topicDao.getPostsCountInTopics(id);
                    let postCountMap = new Map<number, number>();
                    for (let i = 0; i < postCountResult.length; i++)
                        postCountMap.set(postCountResult[i]['TOPIC_ID'],postCountResult[i]['POSTS']);

                    let topicsResult = await this.topicDao.getTopicsInForum(id);
                    forum.topics = [];
                    for (let i = 0; i < topicsResult.length; i++) {
                        let user = new User(topicsResult[i]['USERNAME'],topicsResult[i]['EMAIL'], topicsResult[i]['PROFESSION'], topicsResult[i]['NAME'], topicsResult[i]['GENDER'],new Date(topicsResult[i]['BIRTHDAY']), topicsResult[i]['USER_ID']);
                        let topic = new Topic(topicsResult[i]['TOPIC_ID'], topicsResult[i]['TITLE'], topicsResult[i]['DESCRIPTION'], user, topicsResult[i]['CREATED_DATE']);
                        if (topic.topicId && postCountMap.has(topic.topicId)) {
                            topic.totalPosts = postCountMap.get(topic.topicId);
                        }
                        forum.topics.push(topic);
                    }
                    if (!forum) {
                        reject(forum);
                    }
                    resolve(forum);
                } catch (error) {
                    reject(error);
                }
            })()
        });
    }
}