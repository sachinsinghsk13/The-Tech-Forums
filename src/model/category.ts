import Forum from "./forum";

export default class Category {
    private totalForums: number | undefined;
    constructor(
        public categoryId: number,
        public name: string, 
        public description: string,
        public forums?: Forum[]
        ) {}
}