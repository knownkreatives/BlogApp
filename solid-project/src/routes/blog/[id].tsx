import { createSignal, createEffect, Suspense } from "solid-js";
import { useParams } from "@solidjs/router";
import { getDummyArticleById, fetchNewsArticleById } from "~/utils/ArticleManager";
import { NewsArticle } from "~/types/Article";
import FullDisplay from "~/components/Articles/FullDisplay";

export default function Article() {
	return Real();
}

function Dummy() {
  	const params = useParams();
  	const article = getDummyArticleById(String(params.id));

  	return (
    	<main class="mx-auto text-gray-700 p-4 max-w-2xl">
      		<section>
        		<h1 class="text-5xl font-bold text-gray-800 mb-2">{article?.title}</h1>
        		<p class="text-gray-600 mb-8">{article?.content ?? "No content available"}</p>
      		</section>
    	</main>
  	);
}

function Real() {
  	const params = useParams();
  	const [article, setArticle] = createSignal<NewsArticle | undefined>();

	createEffect(async () => {
		const fetchedArticle = params.id ? await fetchNewsArticleById(params.id) : undefined;
		setArticle(fetchedArticle);
	});

  	return (
    	<main class="mx-auto text-gray-700 p-4 max-w-2xl">
			<Suspense fallback={<div>Loading article...</div>}>
				{article() ? <FullDisplay article={article() as NewsArticle} /> : <div>Article not found.</div>}
			</Suspense>
		</main>
  	);
}