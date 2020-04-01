import Category from "./category";
import Topic from "./topic";

export default class Forum {
    public totalTopics: number | undefined;
    public totalPosts: number | undefined;
    constructor(
        public forumId: number,
        public parentForum: Forum | null,
        public title: string,
        public description: string | null,
        public category: Category,
        public createdDate: Date,
        public topics: Topic[]
    ) {}
}