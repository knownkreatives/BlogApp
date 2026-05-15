import { getAllDummyArticles } from "../../utils/ArticleManager";
import { DummyListItem } from "../../components/Articles/ListItem";

export default function Blog() {
  const articles = getAllDummyArticles();

  return (
    <main class="mx-auto text-gray-700 p-4 max-w-2xl">
      <title>Blog</title>

      <section>
        <h1 class="text-5xl font-bold text-gray-800 mb-2">Blog</h1>
        <p class="text-gray-600 mb-8">Latest articles and tutorials</p>

        <div class="space-y-6">
          {articles.map((article) => (
            <DummyListItem article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
