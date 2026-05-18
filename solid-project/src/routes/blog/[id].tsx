import { createSignal, createEffect, Suspense } from "solid-js";
import { useParams } from "@solidjs/router";
import { fetchNewsArticleById } from "~/utils/ArticleManager";
import { NewsArticle } from "~/types/Article";
import FullDisplay from "~/components/Articles/FullDisplay";

export default function Article() {
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