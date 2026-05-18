import { createEffect, createSignal } from "solid-js";
import { getCachedNewsArticles } from "~/utils/ArticleManager";
import { NewsArticle } from "~/types/Article";
import { Preview } from "~/components/Articles/Preview";

export default function Home() {
	const [articles, setArticles] = createSignal<NewsArticle[]>([]);
	
	createEffect(async () => {
		const fetchedArticles = await getCachedNewsArticles();
		setArticles(fetchedArticles.slice(0, 3));
	});
	
  	return (
		<main class="text-center mx-auto text-gray-700 p-4">
		<title>Home</title>

		<h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">This is a News Blog</h1>
		
		<section>
			<h2 class="text-4xl  text-gray-800 mb-6">Featured Articles</h2>
			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{articles().slice(0, 3).map((article) => (
					<Preview article={article} />
				))}
			</div>
		</section>
		
		<p class="mt-8">
			See more related content{" "}
			<a href="/blog" class="text-sky-600 hover:underline">here</a>{" "}
		</p>
		</main>
	);
}