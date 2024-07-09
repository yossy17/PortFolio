// @/app/articles/page.tsx
import { getArticleList, getCategoryList } from '@/libs/microcms';
import Link from 'next/link';

export default async function ArticlesPage() {
  // 記事一覧とカテゴリー一覧を並列で取得
  const [articles, categories] = await Promise.all([getArticleList(), getCategoryList()]);

  return (
    <div className='main__articles'>
      <h1 className='main__articles__title'>全ての記事一覧</h1>
      <nav className='main__articles__catDetail'>
        <Link href='/articles/categories' className='main__articles__catDetail__link'>
          カテゴリー詳細
        </Link>
        <ul className='main__articles__catDetail__list'>
          {/* カテゴリー一覧の表示 */}
          {categories.contents.map((category) => (
            <li key={category.id} className='main__articles__catDetail__list__type'>
              <Link href={`/articles/categories/${category.categories}`}>
                {category.categories}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className='main__articles__count'>記事数: {articles.totalCount}</p>
      <div className='main__articles__cards'>
        {/* 記事一覧の表示 */}
        {articles.contents.map((article) => (
          <article key={article.id} className='main__articles__cards__card'>
            <Link href={`/articles/${article.id}`} className='main__articles__cards__card__link'>
              {article.title}
            </Link>
            <p className='main__articles__cards__card__categories'>
              カテゴリー:{' '}
              {article.categories.map((category, index) => (
                <span key={category.id}>
                  {index > 0 && ', '}
                  <Link href={`/articles/categories/${category.categories}`}>
                    {category.categories}
                  </Link>
                </span>
              ))}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
