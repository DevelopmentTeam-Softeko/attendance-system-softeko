import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useFetch(url: string) {
  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 1000,
  });

  return {
    data: data,
    isLoading,
    isError: error,
  };
}

export default useFetch;
