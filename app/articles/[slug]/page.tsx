// @/app/articles/[slug]/page.tsx
import { getArticleDetail } from '@/libs/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { inconsolata, consola } from '@/components/Ui/Fonts/Fonts';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// HTMLタグを除去する関数
function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

// DynamicHighlightコンポーネントを動的にインポート
const DynamicHighlight = dynamic(
  () => import('@/components/Ui/DynamicHighlight/DynamicHighlight.tsx'),
  { ssr: false }
);

// メタデータを生成する関数
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const article = await getArticleDetail(params.slug);

    if (!article) {
      return { title: 'Article Not Found' };
    }

    const description = article.intro ? stripHtml(article.intro).substring(0, 160) : '';

    const thumbnailInfo = article.Info?.find((info) => info.fieldId === 'thumbnail');
    const youtubeInfo = article.Info?.find((info) => info.fieldId === 'youtubeInfo');

    let imageUrl =
      thumbnailInfo?.thumbnail?.url ||
      (youtubeInfo?.youtubeID
        ? `https://img.youtube.com/vi/${youtubeInfo.youtubeID}/hqdefault.jpg`
        : '');

    return {
      title: article.title,
      description,
      openGraph: {
        title: article.title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
      twitter: {
        card: 'summary',
        title: article.title,
        description,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return {
      title: 'Error',
      description: 'An error occurred while fetching article metadata.',
    };
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  try {
    const article = await getArticleDetail(params.slug);

    if (!article) {
      notFound();
    }

    if (!article.content || typeof article.content !== 'string') {
      console.error('Invalid article content:', article.content);
      return <div>記事の内容を読み込めませんでした。</div>;
    }

    // サムネイル情報の取得
    const youtubeInfo = article.Info?.find((info) => info.fieldId === 'youtubeInfo');
    const thumbnailInfo = article.Info?.find((info) => info.fieldId === 'thumbnail');

    const imageUrl = youtubeInfo?.youtubeID
      ? `https://img.youtube.com/vi/${youtubeInfo.youtubeID}/hqdefault.jpg`
      : thumbnailInfo?.thumbnail?.url;

    return (
      <article>
        {imageUrl && <Image src={imageUrl} alt={article.title} width={400} height={225} />}
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.intro }} />
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
        <DynamicHighlight content={article.content} />
      </article>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}
