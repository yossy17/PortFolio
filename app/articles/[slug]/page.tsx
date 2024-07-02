import { getArticleDetail, getArticleList } from '@/libs/microcms';
import { generateSlug } from '@/libs/utils';
import { notFound } from 'next/navigation';
import Image from 'next/image';

export async function generateStaticParams() {
  const { contents: articles } = await getArticleList({ fields: ['title'] });

  return articles.map((article) => ({
    slug: generateSlug(article.title),
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { contents: articles } = await getArticleList();
  const article = articles.find((a) => generateSlug(a.title) === params.slug);

  if (!article) {
    notFound();
  }

  const fullArticle = await getArticleDetail(article.id);

  if (!fullArticle) {
    notFound();
  }

  return (
    <article>
      <h1>{fullArticle.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: fullArticle.content }} />
      <p>カテゴリー: {fullArticle.categories.join(', ')}</p>
      <p>作成日: {new Date(fullArticle.createdAt).toLocaleDateString()}</p>
      <p>更新日: {new Date(fullArticle.updatedAt).toLocaleDateString()}</p>
      {fullArticle.thumbnail && (
        <Image
          src={fullArticle.thumbnail.url}
          alt={fullArticle.title}
          width={fullArticle.thumbnail.width}
          height={fullArticle.thumbnail.height}
        />
      )}
    </article>
  );
}
