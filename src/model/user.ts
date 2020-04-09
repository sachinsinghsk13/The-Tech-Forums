import Avtar from "./avtar";
import { formatDateTime } from "../util/dateFormat";

export default class User {
    public posts: number | undefined;
    public topics: number | undefined;
    public prettyDate: string | undefined;
    public html5date: string | undefined;
    constructor(
        public username: string,
        public email: string,
        public profession: string,
        public name: string,
        public gender: string,
        public birthday?: Date,
        public userId?: number,
        public city?: string,
        public state?: string,
        public bio?: string,
        public avtar?: Avtar,
        public password?: string,
    ){
        this.posts = 0;
        this.topics = 0;
        if (this.birthday) {
            this.prettyDate = formatDateTime(this.birthday);
            this.html5date =  this.birthday.getFullYear().toString() + '-' + (this.birthday.getMonth() + 1).toString().padStart(2, '0') + 
            '-' + this.birthday.getDate().toString().padStart(2, '0');
        }
    }
}
