"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

type UseFetchOptions<T> = {
  fetcher: () => Promise<T>;
  enabled?: boolean;
};

type UseFetchReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useFetch<T>({
  fetcher,
  enabled = true,
}: UseFetchOptions<T>): UseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use a ref to store the latest fetcher to avoid infinite loops when 
  // an inline arrow function is passed as a fetcher.
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcherRef.current();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan. Silakan coba lagi."
      );
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty deps because we use ref

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [fetchData, enabled]);

  return { data, isLoading, error, refetch: fetchData };
}

export function useSearch<T>(
  items: T[],
  searchKey: keyof T,
  delay: number = 300
) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, delay);

  const filteredItems = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    return items.filter((item) => {
      const value = item[searchKey];
      if (typeof value === "string") {
        return value.toLowerCase().includes(debouncedQuery.toLowerCase());
      }
      return false;
    });
  }, [items, debouncedQuery, searchKey]);

  return { query, setQuery, filteredItems, debouncedQuery };
}
