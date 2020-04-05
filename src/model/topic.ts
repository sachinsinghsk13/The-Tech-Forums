import Forum from "./forum";
import Post from "./post";
import User from "./user";

export default class Topic {
    public totalPosts: number | undefined;
    constructor(
        public topicId: number,
        public forum: Forum,
        public title: string,
        public description: string,
        public createdBy: User,
        public createdDate: Date,
        public posts: Post[]
    ){}
}