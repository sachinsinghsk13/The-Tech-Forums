import User from "./user";
import Topic from "./topic";
import { getTime } from "../util/dateFormat";

export default class Post {
    public prettyDate: string | undefined;

    public postId: number | undefined;
    public content: string | undefined;
    public datePosted: Date | undefined;
    public postedBy: User | undefined;
    public topic: Topic | undefined;
    constructor(){
        
    }

    setPostedDate(date: Date) {
        this.datePosted = date;
        if (this.datePosted) {
            this.prettyDate = getTime(this.datePosted);
        }
    }
}