import { getArticleDetail, getArticleList } from '@/libs/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { inconsolata } from '@/components/Ui/Fonts/Fonts';

// 静的生成のためのパラメータを生成
export async function generateStaticParams() {
  const { contents: articles } = await getArticleList({ fields: ['id'] });

  return articles.map((article) => ({
    slug: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // 記事の詳細を取得
  try {
    const article = await getArticleDetail(params.slug);

    if (!article) {
      notFound();
    }

    // 記事の内容が有効かチェック
    if (!article.content || typeof article.content !== 'string') {
      console.error('Invalid article content:', article.content);
      return <div>記事の内容を読み込めませんでした。</div>;
    }

    return (
      <article>
        {/* サムネイル画像の表示 */}
        {article.thumbnail && (
          <Image
            src={article.thumbnail.url}
            alt={article.title}
            width={article.thumbnail.width}
            height={article.thumbnail.height}
          />
        )}
        <h1>{article.title}</h1>
        {/* カテゴリーの表示 */}
        <p>
          カテゴリー:
          {article.categories.map((category, index) => (
            <span key={category.id}>
              <Link href={`/articles/categories/${category.categories.toLowerCase()}`}>
                {category.categories}
              </Link>
              {index < article.categories.length - 1 && ', '}
            </span>
          ))}
        </p>
        <p>作成日: {new Date(article.createdAt).toLocaleDateString()}</p>
        <p>更新日: {new Date(article.updatedAt).toLocaleDateString()}</p>
        {/* 記事の内容を表示 */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}
