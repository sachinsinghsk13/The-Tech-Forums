import Avtar from "./avtar";
import { formatDateTime } from "../util/dateFormat";

export default class User {
    public posts: number | undefined;
    public topics: number | undefined;
    public prettyDate: string | undefined;
    public html5date: string | undefined;
    public username: string | undefined;
    public email: string | undefined;
    public profession: string | undefined;
    public name: string | undefined;
    public gender: string | undefined;
    public birthday: Date | undefined;
    public userId: number | undefined;
    public city: string | undefined;
    public state: string | undefined;
    public bio: string | undefined;
    public avtar: Avtar | undefined;
    public password: string | undefined;
    
    constructor(){
        this.posts = 0;
        this.topics = 0;
        
    }
    setBirthday(date: Date) {
        this.birthday = date;
        if (this.birthday) {
            this.prettyDate = formatDateTime(this.birthday);
            this.html5date =  this.birthday.getFullYear().toString() + '-' + (this.birthday.getMonth() + 1).toString().padStart(2, '0') + 
            '-' + this.birthday.getDate().toString().padStart(2, '0');
        }
    }
}
