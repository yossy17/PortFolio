import { createClient, MicroCMSQueries, MicroCMSImage, MicroCMSDate } from 'microcms-js-sdk';

export type Article = {
  id: string;
  title: string;
  // titleId: string;
  content: string;
  categories: string[];
  thumbnail?: MicroCMSImage;
} & MicroCMSDate;

type ClientType = ReturnType<typeof createClient>;

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

const createMicroCMSClient = (): ClientType => {
  return createClient({
    serviceDomain: getEnvVariable('MICROCMS_SERVICE_DOMAIN'),
    apiKey: getEnvVariable('MICROCMS_API_KEY'),
  });
};

let client: ClientType;

const getClient = (): ClientType => {
  if (!client) {
    client = createMicroCMSClient();
  }
  return client;
};

export const getArticleList = async (queries?: MicroCMSQueries) => {
  const data = await getClient().getList<Article>({
    endpoint: 'article',
    queries,
  });
  return data;
};

export const getArticleDetail = async (contentId: string, queries?: MicroCMSQueries) => {
  const data = await getClient().getListDetail<Article>({
    endpoint: 'article',
    contentId,
    queries,
  });
  return data;
};

export const getCategoryList = async () => {
  const data = await getClient().getList<Article>({
    endpoint: 'article',
    queries: { fields: 'categories' },
  });
  const allCategories: string[] = data.contents.flatMap((article) => article.categories);
  const uniqueCategories = allCategories.filter(
    (category, index, self) => self.indexOf(category) === index
  );
  return { contents: uniqueCategories.map((category) => ({ id: category, name: category })) };
};

export const getArticlesByCategory = async (categoryId: string, queries?: MicroCMSQueries) => {
  const data = await getClient().getList<Article>({
    endpoint: 'article',
    queries: {
      ...queries,
      filters: `categories[contains]${categoryId}`,
    },
  });
  return data;
};
