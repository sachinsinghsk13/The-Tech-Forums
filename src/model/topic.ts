import Forum from "./forum";
import Post from "./post";
import User from "./user";
import { formatDate, getTime } from '../util/dateFormat'
const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export default class Topic {
    public totalPosts: number | undefined;
    public prettyDate: string | undefined;
    public posts: Post[] | undefined;

    public title: string | undefined;
    public description: string | undefined;
    public createdBy: User | undefined;
    public createdDate: Date | undefined;
    public topicId: number | undefined;
    public forum: Forum | undefined;
    constructor() {
        this.totalPosts = 0;
    }

    setCreatedDate(date: Date) {
        this.createdDate = date;
        if (this.createdDate) {
            this.prettyDate = getTime(this.createdDate);
        }
    }
}