import { getArticlesByCategory, getCategoryList } from '@/libs/microcms';
import { generateSlug } from '@/libs/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { contents } = await getCategoryList();
  return contents.map((category) => ({
    categoryID: category.id,
  }));
}

export default async function CategoryPage({ params }: { params: { categoryID: string } }) {
  const { contents, totalCount } = await getArticlesByCategory(params.categoryID);

  if (totalCount === 0) {
    notFound();
  }

  return (
    <div>
      <h1>{params.categoryID} の記事一覧</h1>
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
