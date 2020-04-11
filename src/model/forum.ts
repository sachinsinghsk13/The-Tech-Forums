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
    public prettyDate: string | undefined;

    public title: string | undefined;
    public description: string | undefined;
    public createdDate: Date | undefined;
    public forumId: number | undefined;
    constructor() {
        
        this.totalPosts = 0;
        this.totalTopics = 0;
    }
    setCreatedDate(date: Date) {
        this.createdDate = date;
        if (this.createdDate) {
            this.prettyDate = `${month[this.createdDate.getMonth()]} ${this.createdDate.getDate()}, ${this.createdDate.getFullYear()}`;
        }
    }
}