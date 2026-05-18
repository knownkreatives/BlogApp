import { APIResponse, RawNewsArticle, NewsArticle } from "~/types/Article";

function getNewsArticleId(article: RawNewsArticle): string {
    const normalizedUrl = new URL(article.url).hostname + new URL(article.url).pathname + new URL(article.url).search;
    return normalizedUrl
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .toLowerCase();
}

function normalizeNewsArticle(article: RawNewsArticle): NewsArticle {
    return {
        ...article,
        id: getNewsArticleId(article),
    };
}

export async function fetchNewsArticles(): Promise<NewsArticle[]> {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch news articles: ${response.statusText}`);
    }
    const data: APIResponse = await response.json();
    return data.articles.map(normalizeNewsArticle);
}

export var newsArticlesCache: NewsArticle[] | null = null;

export async function getCachedNewsArticles(): Promise<NewsArticle[]> {
    if (newsArticlesCache) {
        return newsArticlesCache;
    }
    newsArticlesCache = await fetchNewsArticles();
    return newsArticlesCache;
}

export async function fetchNewsArticleById(id: string): Promise<NewsArticle | undefined> {
    if (newsArticlesCache) {
        return newsArticlesCache.find((article) => article.id === id);
    }

    const articles = await getCachedNewsArticles();
    return articles.find((article) => article.id === id);

}