import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleList, getCategoryList } from '@/libs/microcms';
import { rockwellNovaBold } from '@/components/Ui/Fonts/Fonts';

export default async function ArticlesPage() {
  // 記事一覧とカテゴリー一覧を取得
  const { contents: articles, totalCount } = await getArticleList();
  const { contents: categories } = await getCategoryList();

  return (
    <>
      <Link href='/articles' className={`${rockwellNovaBold.className}`}>
        Articles
      </Link>
      {articles.map((article) => {
        // サムネイル情報の取得
        const youtubeInfo = article.Info?.find((info) => info.fieldId === 'youtubeInfo');
        const thumbnailInfo = article.Info?.find((info) => info.fieldId === 'thumbnail');

        let imageUrl = '';

        if (youtubeInfo?.youtubeID) {
          imageUrl = `https://img.youtube.com/vi/${youtubeInfo.youtubeID}/hqdefault.jpg`;
        } else if (thumbnailInfo?.thumbnail) {
          imageUrl = thumbnailInfo.thumbnail.url;
        }

        return (
          <article key={article.id}>
            <Link href={`/articles/${article.id}`}>
              {imageUrl && (
                <Image
                  id='thumbnail-image'
                  src={imageUrl}
                  alt={article.title}
                  width={400}
                  height={225}
                  className='TestImageTop'
                />
              )}
              <h2>{article.title}</h2>{' '}
              {article.categories.map((category, index) => (
                <p
                  key={category.id}
                  // href={`/articles/categories/${category.categories.toLowerCase()}`}
                >
                  {category.categories}
                  {index < article.categories.length - 1 && ', '}
                </p>
              ))}
            </Link>
          </article>
        );
      })}
    </>
  );
}
