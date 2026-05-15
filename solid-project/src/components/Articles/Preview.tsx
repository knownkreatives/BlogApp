import { useNavigate } from "@solidjs/router";
import type { DummyArticle, NewsArticle } from "~/utils/ArticleManager";

interface PreviewProps {
    id: number;
    article: NewsArticle;
}
export function Preview(props: PreviewProps) {
    const navigate = useNavigate();

    return (
        <div class="border-l-4 border-sky-500 px-4 py-4 hover:bg-gray-100 transition-colors rounded-md cursor-pointer" onClick={() => navigate(`/blog/${props.id}`)}>
            <section class="flex justify-between items-start mb-2">
				<h2 class="text-2xl font-semibold text-gray-800">{props.article.title}</h2>
				<span class="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded">{props.article.source.name}</span>
            </section>
			<section class="text-gray-600 mb-3">{props.article.description}</section>
			<section class="flex justify-between text-sm text-gray-500">
				<span>{new Date(props.article.publishedAt).toLocaleDateString()}</span>
				<span>{props.article.author}</span>
			</section>
        </div>
    );
}

interface DummyPreviewProps {
    article: DummyArticle;
}

export function DummyPreview(props: DummyPreviewProps) {
    const navigate = useNavigate();

    return (
        <div class="border-l-4 border-sky-500 px-4 py-4 hover:bg-gray-100 transition-colors rounded-md cursor-pointer" onClick={() => navigate(`/blog/${props.article.id}`)}>
            <div class="flex justify-between items-start mb-2">
                <h2 class="text-2xl font-semibold text-gray-800">{props.article.title}</h2>
                <span class="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded">{props.article.category}</span>
            </div>
        </div>
    );
}