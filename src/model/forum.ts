import Category from "./category";
import Topic from "./topic";
const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export default class Forum {
    public totalTopics: number | undefined;
    public totalPosts: number | undefined;
    public category: Category | undefined;
    public subforums: Forum[] | undefined;
    public topics: Topic[] | undefined;
    public prettyDate: string;
    constructor(
        public title: string,
        public description: string | null,
        public createdDate: Date,
        public forumId?: number
    ) {
        this.prettyDate = `${month[createdDate.getMonth()]} ${createdDate.getDate()}, ${createdDate.getFullYear()}`;
        this.totalPosts = 0;
        this.totalTopics = 0;
    }
}