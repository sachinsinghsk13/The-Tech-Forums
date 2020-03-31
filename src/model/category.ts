import Forum from "./forum";

export default class Category {
    constructor(
        public categoryId: number,
        public name: string, 
        public description: string,
        public forums: Forum[] | null
        ) {}
}