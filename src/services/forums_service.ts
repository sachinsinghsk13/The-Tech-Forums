import ForumDao from "../dao/forum_dao";
import Category from "../model/category";
import Forum from "../model/forum";

export default class ForumService {
    constructor(private forumDao: ForumDao) {

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
                        postMap.set(postResult[i]['FORUM_ID'],postResult[i]['POSTS']);
                    }
                    for (let i = 0; i < topicResult.length; i++) {
                        topicMap.set(topicResult[i]['FORUM_ID'],topicResult[i]['TOPICS']);
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
}