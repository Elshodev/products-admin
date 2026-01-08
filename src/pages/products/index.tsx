import { useProductsData } from "@/hooks/useProductsData.ts";
import { useProductsFilters } from "@/hooks/useProductsFilters.ts";
import { useProductsColumns } from "./components/ProductsColumns";
import { ProductsTable } from "./components/ProductsTable";
import Loader from "@/components/Loader";

function Products() {
  const { data, isLoading, isError, error } = useProductsData();

  const { filteredData, setFilters } = useProductsFilters(data);
  const columns = useProductsColumns({
    setIdFilter: setFilters.setIdFilter,
    setProductNameFilter: setFilters.setProductNameFilter,
    setPriceFilter: setFilters.setPriceFilter,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="p-4 text-red-600">
        {(error as Error)?.message ||
          "Mahsulotlarni yuklashda xatolik yuz berdi"}
      </div>
    );
  return (
    <div className="flex flex-col gap-4 h-full">
      <ProductsTable
        columns={columns}
        data={filteredData}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Products;
