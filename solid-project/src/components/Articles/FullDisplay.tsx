import { NewsArticle } from "~/utils/ArticleManager";

export default function FullDisplay(props: { article: NewsArticle }) {
    return (
        <main class="mx-auto text-gray-700 p-4 max-w-2xl">
            <section>
                <h1 class="text-5xl font-bold text-gray-800 mb-2">{props.article.title}</h1>
                <p class="text-gray-600 mb-8">{props.article.description}</p>
                <img src={props.article.urlToImage} alt={props.article.title} class="w-full h-auto rounded mb-8" />
            </section>
            <article class="prose prose-lg text-gray-700">
                <p>{props.article.content}</p>
            </article>
            <section class="mt-8 text-sm text-gray-500">
                <span>Published on: {new Date(props.article.publishedAt).toLocaleDateString()}</span>
                <span class="mx-4">|</span>
                <span>Author: {props.article.author}</span>
            </section>
        </main>
    );
}