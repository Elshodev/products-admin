import { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Variation } from "../types";

interface ProductsTableProps {
  columns: ColumnsType<Variation>;
  data: Variation[];
  isLoading: boolean;
}

export const ProductsTable = ({
  columns,
  data,
  isLoading,
}: ProductsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="rounded shadow bg-white p-4 grow overflow-auto">
      <Table
        sticky={true}
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: 50,
          total: data.length,
          showSizeChanger: false,
          showTotal: (total) => `Jami ${total} ta`,
          onChange: (page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
        }}
        scroll={{ x: 1000 }}
        loading={isLoading}
      />
    </div>
  );
};
