import Forum from "./forum";
import Post from "./post";
import User from "./user";
import {formatDate} from '../util/dateFormat'
const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
export default class Topic {
    public totalPosts: number | undefined;
    public prettyDate: string | undefined;
    public posts: Post[] | undefined;
    constructor(
        public topicId: number,
        public title: string,
        public description: string,
        public createdBy: User,
        public createdDate: Date,
        public forum?: Forum
    ){
        
        this.prettyDate = createdDate.toLocaleString('en-IN' , {
            hour: 'numeric',
            minute: 'numeric',
            day:'numeric',
            month:'short',
            year:'numeric'
        });
        this.totalPosts = 0;
    }
}