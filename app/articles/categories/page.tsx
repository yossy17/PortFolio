// @/app/articles/categories/page.tsx
import Link from 'next/link';
import { getCategoryList } from '@/libs/microcms';

export default async function CategoriesPage() {
  // カテゴリー一覧を取得
  const { contents: categories, totalCount } = await getCategoryList();

  return (
    <>
      <h1>カテゴリー一覧</h1>
      <p>カテゴリー数: {totalCount}</p>
      <ul>
        {/* カテゴリー一覧の表示 */}
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/articles/categories/${category.categories}`}>{category.categories}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
