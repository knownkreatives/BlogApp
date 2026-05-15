import { createEffect } from "solid-js";
import { useParams } from "@solidjs/router";
import { getDummyArticleById, fetchNewsArticleById } from "../../utils/ArticleManager";
import FullDisplay from "~/components/Articles/FullDisplay";

export default function Article() {
	return Dummy();
}

function Dummy() {
  	const params = useParams();
  	const article = getDummyArticleById(params.id);

  	return (
    	<main class="mx-auto text-gray-700 p-4 max-w-2xl">
      		<section>
        		<h1 class="text-5xl font-bold text-gray-800 mb-2">{article?.title}</h1>
        		<p class="text-gray-600 mb-8">{article?.content ?? "No content available"}</p>
      		</section>
    	</main>
  	);
}

async function Real() {
  	const params = useParams();
  	var article = await fetchNewsArticleById(params.id);

	createEffect(() => {
		console.log("Fetched article:", article);
	});

  	return (
    	<main class="mx-auto text-gray-700 p-4 max-w-2xl">
			{article ? <FullDisplay article={article} /> : <p class="text-gray-600">Loading...</p>}
    	</main>
  	);
}