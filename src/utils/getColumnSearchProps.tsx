import { Input, Button, Space } from "antd";
import type { ColumnType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { Variation } from "../types";

export const getColumnSearchProps = (
  setFilter: (value: string) => void,
  placeholder: string
): ColumnType<Variation> => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }: FilterDropdownProps) => (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        placeholder={placeholder}
        value={selectedKeys[0] as string}
        onChange={(e) => {
          setSelectedKeys(e.target.value ? [e.target.value] : []);
          setFilter(e.target.value);
        }}
        onPressEnter={() => {
          confirm();
        }}
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            confirm();
          }}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Qidirish
        </Button>
        <Button
          onClick={() => {
            clearFilters?.();
            setFilter("");
          }}
          size="small"
          style={{ width: 90 }}
        >
          Tozalash
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
  ),
});
