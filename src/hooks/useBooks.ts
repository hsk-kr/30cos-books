import { useCallback, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { naverApi } from '../utils/network';

interface AllSearchParams {
  query: string;
  page: number;
}

interface DetailSearchParams {
  title?: string;
  author?: string;
  publisher?: string;
  page: number;
}

interface BookAPIResponse {
  display: number;
  lastBuildDate: Date;
  start: number;
  total: number;
  items: {
    author: string;
    description: string;
    discount: string;
    image: string;
    isbn: string;
    link: string;
    price: string;
    pubdate: string;
    publisher: string;
    title: string;
  }[];
}

const DISPLAY_CNT = 10;

const fetchNaverBooks = async (
  params?: AllSearchParams | DetailSearchParams
) => {
  const page = params?.page || 1;
  const start = (page - 1) * DISPLAY_CNT + 1;

  const data = (
    await naverApi.get<BookAPIResponse>('v1/search/book.json', {
      params: {
        ...params,
        start,
      },
    })
  ).data;

  const removeUnnecessaryText = (text: string) =>
    text.replace(/<\/?[^>]+(>|$)/g, '');

  data.items = data.items.map((item) => ({
    ...item,
    title: removeUnnecessaryText(item.title),
    description: removeUnnecessaryText(item.description),
  }));

  return data;
};

export const useBooks = () => {
  const [params, setParams] =
    useState<AllSearchParams | DetailSearchParams | undefined>(undefined);
  const queryClient = useQueryClient();

  const dispatch = useCallback(
    (params: AllSearchParams | DetailSearchParams | number) => {
      if (typeof params === 'number') {
        setParams((prevParams) => ({
          ...prevParams,
          page: params,
        }));
      } else {
        setParams(params);
      }
    },
    []
  );

  const useQueryResult = useQuery<BookAPIResponse, Error>(
    'naver-books',
    () => fetchNaverBooks(params),
    {
      staleTime: 60000,
      enabled: false,
      onSuccess: (data) => {
        // save query data to the cache store, it uses the below useEffect
        if (!params) return;

        const key = makeCacheKey(params);
        queryClient.setQueryData(key, data);
      },
    }
  );

  useEffect(() => {
    if (!params) return;

    // use cache if there is cached data
    const key = makeCacheKey(params);
    const cachedData = queryClient.getQueryData(key);
    if (cachedData) {
      queryClient.setQueryData('naver-books', cachedData);
    } else {
      useQueryResult.refetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return { useQueryResult, dispatch };
};

const makeCacheKey = (params: AllSearchParams | DetailSearchParams) => {
  let key = ['naver-books'];

  if ('query' in params) {
    // 전체검색
    key = [...key, params.query, params.page.toString()];
  } else {
    // 상세검색
    key = [
      ...key,
      params.title || 'all',
      params.author || 'all',
      params.publisher || 'all',
      params.page.toString(),
    ];
  }

  return key;
};
