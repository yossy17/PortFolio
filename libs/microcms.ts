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

type ClientType = ReturnType<typeof createClient>;

// 環境変数を取得する関数
const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

// microCMSクライアントを作成する関数
const createMicroCMSClient = (): ClientType => {
  return createClient({
    serviceDomain: getEnvVariable('MICROCMS_SERVICE_DOMAIN'),
    apiKey: getEnvVariable('MICROCMS_API_KEY'),
  });
};

let client: ClientType;

// シングルトンパターンでクライアントを取得する関数
const getClient = (): ClientType => {
  if (!client) {
    client = createMicroCMSClient();
  }
  return client;
};

// 記事一覧を取得する関数
export const getArticleList = async (queries?: MicroCMSQueries) => {
  const data = await getClient().getList<Article>({
    endpoint: 'article',
    queries,
  });
  return data;
};

// 記事詳細を取得する関数
export const getArticleDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const data = await getClient().getListDetail<Article>({
    endpoint: 'article',
    contentId,
    queries,
  });
  return data;
};

// カテゴリー一覧を取得する関数
export const getCategoryList = async (queries?: MicroCMSQueries) => {
  const data = await getClient().getList<Category>({
    endpoint: 'categories',
    queries,
  });
  return data;
};

// カテゴリーに属する記事を取得する関数
export const getArticlesByCategory = async (categoryName: string, queries?: MicroCMSQueries) => {
  const data = await getClient().getList<Article>({
    endpoint: 'article',
    queries: {
      ...queries,
      filters: `categories[contains]${categoryName}[or]categories[equals]${categoryName}`,
    },
  });
  return data;
};
