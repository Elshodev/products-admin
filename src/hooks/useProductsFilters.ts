import { useState, useMemo } from "react";
import { Variation } from "@/pages/products/types";
import formatNumber from "@/utils/formatNumber";

export const useProductsFilters = (data: Variation[]) => {
  const [idFilter, setIdFilter] = useState("");
  const [productNameFilter, setProductNameFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const filteredData = useMemo(() => {
    let result = data.filter((item) => {
      if (idFilter.trim()) {
        const itemId = String(item?.id || "").toLowerCase();
        if (!itemId.includes(idFilter.toLowerCase())) return false;
      }

      if (productNameFilter.trim()) {
        const name = (item?.productName || "").toLowerCase();
        if (!name.includes(productNameFilter.toLowerCase())) return false;
      }

      if (priceFilter.trim()) {
        const price = item?.stocks?.[0]?.sellPrice?.UZS || 0;
        const priceStr = formatNumber(price).replace(/\s/g, "");
        if (!priceStr.includes(priceFilter.replace(/\s/g, ""))) return false;
      }

      return true;
    });

    if (productNameFilter.trim()) {
      const query = productNameFilter.toLowerCase();

      result = result.sort((a, b) => {
        const nameA = (a.productName || "").toLowerCase();
        const nameB = (b.productName || "").toLowerCase();

        const indexA = nameA.indexOf(query);
        const indexB = nameB.indexOf(query);

        // 1️⃣ Avval qidirilgan so‘z qayerda chiqqaniga qarab
        if (indexA !== indexB) {
          return indexA - indexB;
        }

        // 2️⃣ Agar index bir xil bo‘lsa — alfavit bo‘yicha
        return nameA.localeCompare(nameB);
      });
    }

    return result;
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
