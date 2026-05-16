export interface ArticleComment {
    id: string;
    newsId: string;
    userId: string;
    content: string;
    postedAt: string;
    edited: boolean;
    editedAt?: string;
    likes: number;
    shares: number;
}
