export interface APIResponse {
    status: string;
    totalResults: number;
    articles: RawNewsArticle[];
}

export interface RawNewsArticle {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface NewsArticle extends RawNewsArticle {
    id: string;
}