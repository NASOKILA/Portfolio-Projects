export class OrderCreateModel {
    constructor(
        public _id: string,
        public comix: string,
        public date: string,
        public buyer: string,
        public price: string) { }
}