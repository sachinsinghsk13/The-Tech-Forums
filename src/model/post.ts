import User from "./user";

export default class Post {
    public prettyDate: string;
    constructor(
        public postId: number,
        public content: string,
        public datePosted: Date,
        public postedBy: User
    ){
        this.prettyDate = datePosted.toLocaleString('en-IN' , {
            hour: 'numeric',
            minute: 'numeric',
            day:'numeric',
            month:'short',
            year:'numeric'
        });
    }
}