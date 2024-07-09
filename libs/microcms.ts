// @/libs/microcms.ts
import { createClient, MicroCMSQueries, MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk';

// 記事の型定義
export type Article = {
  id: string;
  title: string;
  intro: string;
  content: string;
  categories: Category[];
  Info: ArticleInfo[];
} & MicroCMSDate;

// 記事の情報の型定義
export type ArticleInfo = {
  fieldId: 'thumbnail' | 'youtubeInfo';
  thumbnail?: MicroCMSImage;
  youtubeID?: string;
  videoFormat?: string[];
};

// カテゴリーの型定義
export type Category = {
  id: string;
  categories: string;
} & MicroCMSDate;

// microCMSクライアントの作成
const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// 記事一覧を取得する関数
export const getArticleList = async (queries?: MicroCMSQueries) => {
  return client.getList<Article>({ endpoint: 'article', queries });
};

// 記事詳細を取得する関数
export const getArticleDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  return client.getListDetail<Article>({ endpoint: 'article', contentId, queries });
};

// カテゴリー一覧を取得する関数
export const getCategoryList = async (queries?: MicroCMSQueries) => {
  return client.getList<Category>({ endpoint: 'categories', queries });
};

// カテゴリーに属する記事を取得する関数
export const getArticlesByCategory = async (categoryId: string, queries?: MicroCMSQueries) => {
  return client.getList<Article>({
    endpoint: 'article',
    queries: {
      ...queries,
      filters: `categories[contains]${categoryId}`,
    },
  });
};
