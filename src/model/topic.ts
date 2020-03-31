import Forum from "./forum";
import Post from "./post";

export default class Topic {
    constructor(
        public topicId: number,
        public forum: Forum,
        public title: string,
        public description: string,
        public createdBy: string,
        public createdDate: Date,
        public posts: Post[]
    ){}
}