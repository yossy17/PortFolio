// @\app\articles\[slug]\page.tsx
import { Inconsolata } from 'next/font/google';
import { getArticleDetail, getArticleList } from '@/libs/microcms';
import { generateSlug } from '@/libs/wanakana';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.min.css';
import Link from 'next/link';

const inconsolata = Inconsolata({
  weight: ['400'],
  subsets: ['latin'],
  style: ['normal'],
});

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

  if (!fullArticle.content || typeof fullArticle.content !== 'string') {
    console.error('Invalid article content:', fullArticle.content);
    return <div>記事の内容を読み込めませんでした。</div>;
  }

  const contentWithHighlight = applyCodeHighlight(fullArticle.content);

  return (
    <article>
      <h1>{fullArticle.title}</h1>
      <div>
        カテゴリー:
        {fullArticle.categories.map((category, index) => (
          <span key={category.id}>
            {index > 0 && ', '}
            <Link href={`/articles/categories/${category.categories}`}>{category.categories}</Link>
          </span>
        ))}
      </div>
      <p>作成日: {new Date(fullArticle.createdAt).toLocaleDateString()}</p>
      <p>更新日: {new Date(fullArticle.updatedAt).toLocaleDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: contentWithHighlight }} />
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

function applyCodeHighlight(content: string): string {
  try {
    const $ = cheerio.load(content);
    $('div[data-filename]').each((_, element) => {
      const filename = $(element).attr('data-filename');
      $(element).prepend(`<p>${filename}</p>`);
      $(element).addClass('code-block');
      $(element).addClass(inconsolata.className);
    });
    $('pre code').each((_, element) => {
      const code = $(element).text();
      const highlightedCode = hljs.highlightAuto(code).value;
      $(element).html(highlightedCode);
      $(element).addClass('hljs');
      $(element).addClass(inconsolata.className);
    });
    return $.html();
  } catch (error) {
    console.error('Error processing article content:', error);
    return content;
  }
}
