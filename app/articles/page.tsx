import { getArticleList, getCategoryList } from '@/libs/microcms';
import { generateSlug } from '@/libs/wanakana';
import Link from 'next/link';

export default async function ArticlesPage() {
  const { contents: articles, totalCount } = await getArticleList();
  const { contents: categories } = await getCategoryList();

  return (
    <>
      <h1>全ての記事一覧</h1>
      <nav>
        <Link href='/articles/categories'>カテゴリー詳細</Link>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/articles/categories/${category.categories}`}>
                {category.categories}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>記事数: {totalCount}</p>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${generateSlug(article.title)}`}>{article.title}</Link>
            <p>更新日: {new Date(article.updatedAt).toLocaleDateString()}</p>
            <p>
              カテゴリー:
              {article.categories.map((category, index) => (
                <span key={category.id}>
                  {index > 0 && ', '}
                  <Link href={`/articles/categories/${category.categories}`}>
                    {category.categories}
                  </Link>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
