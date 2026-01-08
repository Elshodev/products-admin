import { useState, useMemo } from "react";
import { Variation } from "@/pages/products/types";
import formatNumber from "@/utils/formatNumber";

export const useProductsFilters = (data: Variation[]) => {
  const [idFilter, setIdFilter] = useState<string>("");
  const [productNameFilter, setProductNameFilter] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("");

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (idFilter.trim()) {
        const itemId = String(item?.id || "").toLowerCase();
        if (!itemId.includes(idFilter.toLowerCase())) return false;
      }

      if (productNameFilter.trim()) {
        const productName = (item?.productName || "").toLowerCase();
        if (!productName.includes(productNameFilter.toLowerCase()))
          return false;
      }

      if (priceFilter.trim()) {
        const price = item?.stocks?.[0]?.sellPrice?.UZS || 0;
        const priceStr = formatNumber(price).toLowerCase();
        const filterValue = priceFilter.toLowerCase().replace(/\s/g, "");
        if (!priceStr.includes(filterValue)) return false;
      }

      return true;
    });
  }, [data, idFilter, productNameFilter, priceFilter]);

  return {
    filteredData,
    filters: {
      idFilter,
      productNameFilter,
      priceFilter,
    },
    setFilters: {
      setIdFilter,
      setProductNameFilter,
      setPriceFilter,
    },
  };
};
