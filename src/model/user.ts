export default class User {
    constructor(
        public userId: number,
        public username: string,
        public email: string,
        public profession: string,
        public name: string,
        public birthDate: Date,
        public gender: string
    ){}
}