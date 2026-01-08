import type { ColumnsType } from "antd/es/table";
import { Variation } from "../types";
import formatNumber from "@/utils/formatNumber";
import { getColumnSearchProps } from "@/utils/getColumnSearchProps";

interface UseProductsColumnsProps {
  setIdFilter: (value: string) => void;
  setProductNameFilter: (value: string) => void;
  setPriceFilter: (value: string) => void;
}

export const useProductsColumns = ({
  setIdFilter,
  setProductNameFilter,
  setPriceFilter,
}: UseProductsColumnsProps): ColumnsType<Variation> => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a?.id - b?.id,
    width: 200,
    ...getColumnSearchProps(setIdFilter, "ID bo'yicha qidirish"),
  },
  {
    title: "Mahsulot nomi",
    dataIndex: "productName",
    key: "productName",
    sorter: (a, b) => {
      const nameA = (a?.productName || "").toLowerCase();
      const nameB = (b?.productName || "").toLowerCase();
      return nameA.localeCompare(nameB);
    },
    render: (_, record) => record?.productName || "-",
    width: 200,
    ...getColumnSearchProps(
      setProductNameFilter,
      "Mahsulot nomi bo'yicha qidirish"
    ),
  },
  {
    title: "Sotish narxi (UZS)",
    dataIndex: "sellPrice",
    key: "sellPrice",
    sorter: (a, b) => {
      const priceA = a?.stocks?.[0]?.sellPrice?.UZS || 0;
      const priceB = b?.stocks?.[0]?.sellPrice?.UZS || 0;
      return priceA - priceB;
    },
    render: (_, record) => {
      const price = record?.stocks?.[0]?.sellPrice?.UZS;
      return price ? `${formatNumber(price)} UZS` : "-";
    },
    width: 180,
    ...getColumnSearchProps(setPriceFilter, "Narx bo'yicha qidirish"),
  },
];
