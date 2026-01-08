import { useQuery } from "@tanstack/react-query";
import { allAPI } from "@/lib/api";
import { Variation } from "../types";

export const useProductsData = () => {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => allAPI.productsAPI.getProducts(),
    staleTime: 30000,
  });

  const allVariations: Variation[] =
    response?.data?.items || response?.data || [];

  return {
    data: allVariations,
    isLoading,
    isError,
    error,
  };
};
