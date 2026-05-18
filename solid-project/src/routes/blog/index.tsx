import { createSignal, createEffect, Suspense } from "solid-js";
import { getCachedNewsArticles } from "~/utils/ArticleManager";
import { NewsArticle } from "~/types/Article";
import { ListItem } from "~/components/Articles/ListItem";

export default function Blog() {
	const [articles, setArticles] = createSignal<NewsArticle[]>([]);

	createEffect(async () => {
		const fetchedArticles = await getCachedNewsArticles();
		setArticles(fetchedArticles);
	});

	return (
    	<main class="mx-auto text-gray-700 p-4 max-w-2xl">
      		<title>Blog</title>

      		<section>
				<h1 class="text-5xl font-bold text-gray-800 mb-2">Blog</h1>
				<p class="text-gray-600 mb-8">Latest articles</p>

				
				<Suspense fallback={<div>Loading articles...</div>}>
					<div class="space-y-6">
						{articles().map((article) => (
							<ListItem article={article} />
						))}
					</div>
				</Suspense>
      		</section>
    	</main>
  );
}