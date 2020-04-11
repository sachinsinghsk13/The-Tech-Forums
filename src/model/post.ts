import User from "./user";
import Topic from "./topic";

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
            this.prettyDate = this.datePosted?.toLocaleString('en-IN' , {
                hour: 'numeric',
                minute: 'numeric',
                day:'numeric',
                month:'short',
                year:'numeric'
            });
        }
    }
}