import { getArticleList } from '@/libs/microcms';
import { generateSlug } from '@/libs/utils';
import Link from 'next/link';

export default async function ArticlesPage() {
  const { contents, totalCount } = await getArticleList();

  return (
    <div>
      <h1>全ての記事一覧</h1>
      <p>記事数: {totalCount}</p>
      <ul>
        {contents.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${generateSlug(article.title)}`}>{article.title}</Link>
            <p>更新日: {new Date(article.updatedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
