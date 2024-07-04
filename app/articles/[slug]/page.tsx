import { Inconsolata } from 'next/font/google';
import { getArticleDetail, getArticleList } from '@/libs/microcms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
// import cheerio from 'cheerio';
// import hljs from 'highlight.js';
// import 'highlight.js/styles/atom-one-dark.min.css';

// Inconsolataフォントの設定
const inconsolata = Inconsolata({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
});

// 静的生成のためのパラメータを生成
export async function generateStaticParams() {
  const { contents: articles } = await getArticleList({ fields: ['title'] });

  return articles.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  // 記事の詳細を取得
  const article = await getArticleDetail(params.id);

  if (!article) {
    notFound();
  }

  // 記事の内容が有効かチェック
  if (!article.content || typeof article.content !== 'string') {
    console.error('Invalid article content:', article.content);
    return <div>記事の内容を読み込めませんでした。</div>;
  }

  // シンタックスハイライト処理
  // try {
  //   const $ = cheerio.load(article.content);
  //   $('div[data-filename]').each((_, element) => {
  //     const filename = $(element).attr('data-filename');
  //     $(element).prepend(`<p>${filename}</p>`);
  //     $(element).addClass('Hoge');
  //     $(element).addClass(inconsolata.className);
  //   });
  //   $('pre code').each((_, element) => {
  //     const code = $(element).text();
  //     const highlightedCode = hljs.highlightAuto(code).value;
  //     $(element).html(highlightedCode);
  //     $(element).addClass('hljs');
  //     $(element).addClass(inconsolata.className);
  //   });
  //   article.content = $.html();
  // } catch (error) {
  //   console.error('Error processing article content:', error);
  // }

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
}
