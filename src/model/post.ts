import User from "./user";

export default class Post {
    constructor(
        public postId: number,
        public content: string,
        public datePosted: Date,
        public postedBy: User
    ){}
}