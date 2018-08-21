
export class ComixEditModel {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public image: string,
        public stock: number,
        public comments: string[],
        public price: number,
        public date: string,

    ) { }
}