import Forum from "./forum";

export default class Category {
    public totalForums: number | undefined;
    public categoryId: number | undefined;
    public name: string | undefined;
    public description: string | undefined;
    public forums: Forum[] | undefined;
    constructor() {}
}