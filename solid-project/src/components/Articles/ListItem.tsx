import { A } from "@solidjs/router";
import type { DummyArticle, NewsArticle } from "../../utils/ArticleManager";

interface ListItemProps {
  id: number;
  article: NewsArticle;
}

export function ListItem(props: ListItemProps) {
  return (
    <article class="border-l-4 border-sky-500 px-4 py-4 hover:bg-gray-100 transition-colors rounded-md">
      
    </article>
  );
}

interface DummyListItemProps {
  article: DummyArticle;
}

export function DummyListItem(props: DummyListItemProps) {
  return (
    <article class="border-l-4 border-sky-500 px-4 py-4 hover:bg-gray-100 transition-colors rounded-md">
      <div class="flex justify-between items-start mb-2">
        <h2 class="text-2xl font-semibold text-gray-800">
          <A href={`/blog/${props.article.id}`} class="text-sky-700 hover:underline">
            {props.article.title}
          </A>
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