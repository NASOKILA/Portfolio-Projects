export class CommentCreateModel {
    constructor(
        public date: string,
        public comixId: string,
        public description: string,
        public creator: string) { }
}