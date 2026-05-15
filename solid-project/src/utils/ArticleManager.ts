export interface DummyArticle {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    date: string;
    author: string;
    category: string;
}

export const dummyArticles: DummyArticle[] = [
    {
        id: "1",
        title: "Getting Started with SolidJS",
        excerpt: "Learn the basics of SolidJS and why it's a great choice for building reactive UIs.",
        content: "SolidJS is a fast and lightweight framework for building user interfaces. It uses a unique approach to reactivity that makes it incredibly performant.",
        date: "May 10, 2026",
        author: "John Doe",
        category: "Tutorial",
    },  
    {
        id: "2",
        title: "SolidJS vs React: A Comparison",
        excerpt: "Explore the key differences between SolidJS and React, and when to use each.",
        content: "When comparing SolidJS and React, it's important to understand their different approaches to reactivity and performance.",
        date: "May 5, 2026",
        author: "Jane Smith",
        category: "Comparison",
    },  
    {
        id: "3",
        title: "Building a Blog with SolidStart",
        excerpt: "Step-by-step guide to creating a blog application using SolidStart and file-based routing.",
        content: "This is the full content of the article about building a blog with SolidStart. It covers setting up the project, creating routes, and managing articles.",
        date: "April 28, 2026",
        author: "John Doe",
        category: "Tutorial",
    },  
    {
        id: "4",
        title: "Advanced SolidJS Patterns",
        excerpt: "Deep dive into advanced patterns and best practices for building scalable SolidJS applications.",
        date: "April 15, 2026",
        author: "Mike Johnson",
        category: "Advanced",
    },
    {
        id: "5",
        title: "Optimizing SolidJS Performance",
        excerpt: "Tips and tricks for squeezing the most performance out of your SolidJS apps.",
        content: "Learn how to optimize reactive updates, reduce unnecessary renders, and use memoization with SolidJS.",
        date: "May 1, 2026",
        author: "Laura White",
        category: "Performance",
    },
    {
        id: "6",
        title: "State Management in SolidJS",
        excerpt: "A guide to managing state effectively in SolidJS applications.",
        content: "Discover how to use stores, signals, and context to keep your SolidJS app state organized and maintainable.",
        date: "April 22, 2026",
        author: "David Lee",
        category: "Tutorial",
    },
    {
        id: "7",
        title: "SolidJS Component Composition",
        excerpt: "Learn how to build reusable and composable SolidJS components.",
        content: "Component composition is key to maintainable UI code. This article covers patterns for building reusable SolidJS components.",
        date: "April 18, 2026",
        author: "Aisha Patel",
        category: "Best Practices",
    },
];

export function getAllDummyArticles(): DummyArticle[] {
  return dummyArticles;
}

export function getDummyArticleById(id: string): DummyArticle | undefined {
  return dummyArticles.find((article) => article.id === id);
}

// The following functions are for fetching real news articles from an external API (e.g., NewsAPI.org)
export interface APIResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}

export interface NewsArticle {
    source: { id: string; name: string };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export async function fetchNewsArticles(): Promise<NewsArticle[]> {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch news articles: ${response.statusText}`);
    }
    const data: APIResponse = await response.json();
    return data.articles;
}

export var newsArticlesCache: NewsArticle[] | null = null;

export async function getCachedNewsArticles(): Promise<NewsArticle[]> {
    if (newsArticlesCache) {
        return newsArticlesCache;
    }
    newsArticlesCache = await fetchNewsArticles();
    return newsArticlesCache;
}

export async function fetchNewsArticleById(id: number): Promise<NewsArticle | undefined> {
    if (newsArticlesCache) {
        return newsArticlesCache[id];
    }

    const articles = await getCachedNewsArticles();
    return articles[id];
}