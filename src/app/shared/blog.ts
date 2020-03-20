export class Blog {
    id ?: string;
    heading : string;
    subHeading : string;
    image : string;
    category ?: string;
    author ?: Object;
    likes ?: number;
    date : string;
    content : string;
    approve ?: boolean;
}