import { getArticleDetail, getArticleList } from '@/libs/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { inconsolata } from '@/components/Ui/Fonts/Fonts';
import { Metadata } from 'next';
import cheerio from 'cheerio';
import hljs from 'highlight.js';

import 'highlight.js/styles/atom-one-dark.min.css';

// メタデータのdescriptionでHTMLタグを除去
function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, '');
}

// 静的生成のためのパラメータを生成
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const article = await getArticleDetail(params.slug);

    if (!article) {
      return {
        title: 'Article Not Found',
      };
    }

    const description = article.intro ? stripHtml(article.intro).substring(0, 160) : '';

    const thumbnailInfo = article.Info?.find((info) => info.fieldId === 'thumbnail');
    const youtubeInfo = article.Info?.find((info) => info.fieldId === 'youtubeInfo');

    let imageUrl = '';
    if (thumbnailInfo?.thumbnail?.url) {
      imageUrl = thumbnailInfo.thumbnail.url;
    } else if (youtubeInfo?.youtubeID) {
      imageUrl = `https://img.youtube.com/vi/${youtubeInfo.youtubeID}/hqdefault.jpg`;
    }

    return {
      title: article.title,
      description: description,
      openGraph: {
        title: article.title,
        description: description,
        images: imageUrl ? [imageUrl] : [],
      },
      twitter: {
        card: 'summary',
        title: article.title,
        description: description,
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
    const thumbnailInfo = article.Info?.find((info) => info.fieldId === 'thumbnail');
    const youtubeInfo = article.Info?.find((info) => info.fieldId === 'youtubeInfo');

    let imageUrl = '';
    let width = 0;
    let height = 0;

    if (thumbnailInfo?.thumbnail) {
      imageUrl = thumbnailInfo.thumbnail.url;
      width = thumbnailInfo.thumbnail.width || 0;
      height = thumbnailInfo.thumbnail.height || 0;
    } else if (youtubeInfo?.youtubeID) {
      imageUrl = `https://img.youtube.com/vi/${youtubeInfo.youtubeID}/hqdefault.jpg`;
      width = 480; // YouTube のhqdefault サムネイルの標準サイズ
      height = 360; // YouTube のhqdefault サムネイルの標準サイズ
    }

    return (
      <article>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={article.title}
            width={width}
            height={height}
            id='thumbnail-image'
          />
        )}
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
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
}
