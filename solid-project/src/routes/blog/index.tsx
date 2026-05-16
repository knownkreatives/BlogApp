import { createSignal, createEffect, Suspense } from "solid-js";
import { getAllDummyArticles, getCachedNewsArticles } from "~/utils/ArticleManager";
import { NewsArticle } from "~/types/Article";
import { DummyListItem, ListItem } from "~/components/Articles/ListItem";

export default function Blog() {
	return (
    	<main class="mx-auto text-gray-700 p-4 max-w-2xl">
      		<title>Blog</title>

      		<section>
				<h1 class="text-5xl font-bold text-gray-800 mb-2">Blog</h1>
				<p class="text-gray-600 mb-8">Latest articles</p>

				<Real />
      		</section>
    	</main>
  );
}

function Dummy() {
  	const articles = getAllDummyArticles();

  	return (
		<div class="space-y-6">
			{articles.map((article) => (
				<DummyListItem article={article} />
			))}
		</div>
  );
}

function Real() {
	const [articles, setArticles] = createSignal<NewsArticle[]>([]);

	createEffect(async () => {
		const fetchedArticles = await getCachedNewsArticles();
		setArticles(fetchedArticles);
	});

	return (
		<Suspense fallback={<div>Loading articles...</div>}>
			<div class="space-y-6">
				{articles().map((article) => (
					<ListItem article={article} />
				))}
			</div>
		</Suspense>
	);
}