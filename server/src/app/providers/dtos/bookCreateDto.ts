export interface BookCreateDto {
    id:string;
    isbn:string;
    provider:string;
    title: string;
    subtitle: string;
    description: string;
    imageLink: string;
    pageCount: number;
    authors: string[];
    publishedDate: Date;
    providerName: string;
}
