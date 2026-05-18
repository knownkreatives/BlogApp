import { NewsArticle } from "~/types/Article";

interface FullDisplayProps {
    article: NewsArticle;
}

export default function FullDisplay(props: FullDisplayProps) {
    return (
        <main class="mx-auto text-gray-700 p-4 max-w-4xl">
            <section>
                <h1 class="text-4xl font-bold text-gray-800 mb-2">{props.article.title}</h1>
                <p class="text-gray-600 mb-8">{props.article.description}</p>
                <img src={props.article.urlToImage} alt={props.article.title} class="w-full h-auto rounded mb-8" />
            </section>
            <article class="prose prose-lg text-gray-700">
                <p>{props.article.content}</p>
                <a href={props.article.url} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">
                    Read more
                </a>
            </article>
            <section class="mt-8 text-sm text-gray-500">
                <span>Published on: {new Date(props.article.publishedAt).toLocaleDateString()}</span>
                <span class="mx-4">|</span>
                <span>Author: {props.article.author}</span>
            </section>
        </main>
    );
}