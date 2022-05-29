import { useCallback, useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { naverApi } from '../utils/network';

interface AllSearchParams {
  query: string;
  page: number;
}

export interface DetailSearchParams {
  d_titl?: string;
  d_auth?: string;
  d_publ?: string;
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

const SEARCH_ALL_URL = 'v1/search/book.json';
const SEARCH_DETAIL_URL = 'v1/search/book_adv';

const isAllSearchParams = (
  params?: AllSearchParams | DetailSearchParams
): params is AllSearchParams => {
  return 'query' in (params || {});
};

const fetchNaverBooks = async (
  params?: AllSearchParams | DetailSearchParams
) => {
  const page = params?.page || 1;
  const start = (page - 1) * DISPLAY_CNT + 1;

  // change url depending on parameters
  let url = '';
  if (isAllSearchParams(params)) {
    url = SEARCH_ALL_URL;
  } else {
    url = SEARCH_DETAIL_URL;
  }

  const data = (
    await naverApi.get<BookAPIResponse>(url, {
      params: {
        ...params,
        start,
        page: undefined,
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

  if (isAllSearchParams(params)) {
    // 전체검색
    key = [...key, params.query, params.page.toString()];
  } else {
    // 상세검색
    key = [
      ...key,
      params.d_titl || 'all',
      params.d_auth || 'all',
      params.d_publ || 'all',
      params.page.toString(),
    ];
  }

  return key;
};
