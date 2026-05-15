import { useNavigate } from "@solidjs/router";
import type { DummyArticle, NewsArticle } from "~/utils/ArticleManager";

interface ListItemProps {
  id: number;
  article: NewsArticle;
}

export function ListItem(props: ListItemProps) {
    const navigate = useNavigate();
  
	return (
		<article class="border-l-4 border-sky-500 px-4 py-4 hover:bg-gray-100 transition-colors rounded-md" onClick={() => navigate(`/blog/${props.id}`)}>
		<div class="flex justify-between items-start mb-2">
			<h2 class="text-2xl font-semibold text-gray-800">
			<a href={`/blog/${props.id}`} class="text-sky-700 hover:underline">
				{props.article.title}
			</a>
			</h2>
			<span class="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded">
			{props.article.source.name}
			</span>
		</div>
		<p class="text-gray-600 mb-3">{props.article.description}</p>
		<div class="flex justify-between text-sm text-gray-500">
			<span>{props.article.author}</span>
			<span>{props.article.publishedAt}</span>
		</div>
		</article>
	);
}

interface DummyListItemProps {
  	article: DummyArticle;
}

export function DummyListItem(props: DummyListItemProps) {
    const navigate = useNavigate();
  
	return (
		<article class="border-l-4 border-sky-500 px-4 py-4 hover:bg-gray-100 transition-colors rounded-md" onClick={() => navigate(`/blog/${props.article.id}`)}>
		<div class="flex justify-between items-start mb-2">
			<h2 class="text-2xl font-semibold text-gray-800">
			<a href={`/blog/${props.article.id}`} class="text-sky-700 hover:underline">
				{props.article.title}
			</a>
			</h2>
			<span class="text-sm bg-sky-100 text-sky-700 px-3 py-1 rounded">
			{props.article.category}
			</span>
		</div>
		<p class="text-gray-600 mb-3">{props.article.excerpt}</p>
		<div class="flex justify-between text-sm text-gray-500">
			<span>{props.article.author}</span>
			<span>{props.article.date}</span>
		</div>
		</article>
	);
}