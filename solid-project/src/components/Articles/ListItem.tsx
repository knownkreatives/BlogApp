import { useNavigate } from "@solidjs/router";
import type { NewsArticle } from "~/types/Article";

interface ListItemProps {
  article: NewsArticle;
}

export function ListItem(props: ListItemProps) {
    const navigate = useNavigate();
  
	return (
		<article class="border-l-4 border-sky-500 px-4 py-4 hover:bg-gray-100 transition-colors rounded-md" onClick={() => navigate(`/blog/${props.article.id}`)}>
		<div class="flex justify-between items-start mb-2">
			<h2 class="text-2xl font-semibold text-gray-800">
			<a href={`/blog/${props.article.id}`} class="text-sky-700 hover:underline">
				{props.article.title}
			</a>
			</h2>
		</div>
		<p class="text-gray-600 mb-3">{props.article.description}</p>
		<p class="text-emerald-600 text-sm mb-3">
			{props.article.source.name}
		</p>
		<div class="flex justify-between text-xs text-gray-500">
			<span>{props.article.author}</span>
			<span>{props.article.publishedAt}</span>
		</div>
		</article>
	);
}
