import { getArticleList, getCategoryList } from '@/libs/microcms';
// import { generateSlug } from '@/libs/wanakana';
import Link from 'next/link';

export default async function ArticlesPage() {
  // 記事一覧とカテゴリー一覧を取得
  const { contents: articles, totalCount } = await getArticleList();
  const { contents: categories } = await getCategoryList();

  return (
    <div className='main__articles'>
      <h1 className='main__articles__title'>全ての記事一覧</h1>
      <nav className='main__articles__catDetail'>
        <Link href='/articles/categories' className='main__articles__catDetail__link'>
          カテゴリー詳細
        </Link>
        <ul className='main__articles__catDetail__list'>
          {categories.map((category) => (
            <li key={category.id} className='main__articles__catDetail__list__type'>
              <Link href={`/articles/categories/${category.categories}`}>
                {category.categories}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p className='main__articles__count'>記事数: {totalCount}</p>
      <div className='main__articles__cards'>
        {articles.map((article) => (
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
