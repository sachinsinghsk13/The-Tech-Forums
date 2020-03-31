import Category from "./category";
import Topic from "./topic";

export default class Forum {
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