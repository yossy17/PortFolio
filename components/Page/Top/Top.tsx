import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleList, getCategoryList } from '@/libs/microcms';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
          <article key={article.id}>
            {imageUrl && (
              <Image
                id='thumbnail-image'
                src={imageUrl}
                alt={article.title}
                width={width}
                height={height}
                className='TestImageTop'
              />
            )}
          </article>
        );
      })}
    </>
  );
}
