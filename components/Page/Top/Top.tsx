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
      {articles.map((article) => (
        <article key={article.id}>
          {/* <Link href={`/articles/${article.id}`}>{article.title}</Link> */}
          {article.thumbnail && (
            <Image
              src={article.thumbnail.url}
              alt={article.title}
              width={article.thumbnail.width}
              height={article.thumbnail.height}
              className='TestImageTop'
            />
          )}
        </article>
      ))}
    </>
  );
}
