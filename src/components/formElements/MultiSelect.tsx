import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, X, Search } from "lucide-react";
import CustomLabel from "./CustomLabel";
import { useQuery } from "@tanstack/react-query";
import { allAPI } from "@/lib/api";
import { SelectOption } from "@/types/users";

interface MultiSelectProps {
  isMultiple?: boolean;
  value?: any[];
  options: any[];
  placeholder?: string;
  onChange: (e: any) => void;
  className?: string;
  divClassname?: string;
  required?: boolean;
  isError?: boolean;
  setIsError?: (error: boolean) => void;
  label?: string;
  name?: string;
  isLoading?: boolean;
  searchable?: boolean;
  searchEndpoint?: string;
  searchParam?: string;
  searchDelay?: number;
  enableBackendSearch?: boolean;
}

const MultiSelect = ({
  isMultiple = true,
  value = [],
  options = [],
  placeholder = "Tanlang...",
  onChange,
  className = "",
  divClassname = "",
  required = false,
  isError,
  setIsError,
  label,
  name,
  isLoading = false,
  searchable = true,
  searchEndpoint = "",
  searchParam = "ssid",
  searchDelay = 500,
  enableBackendSearch = false,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<any[]>(value);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // GET query
  const {
    data: searchResults,
    isLoading: isSearching,
    isError: searchError,
  } = useQuery({
    queryKey: ["operators"],
    queryFn: () => allAPI.operatorsAPI.getOperators({ page: 1 }),
    staleTime: 30000,
    enabled: enableBackendSearch,
  });

  // Debounce for backend search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, searchDelay);
    return () => clearTimeout(timer);
  }, [searchTerm, searchDelay]);

  useEffect(() => {
    setSelectedItems(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options
  const getDisplayOptions = useCallback(() => {
    if (enableBackendSearch && debouncedSearchTerm.trim()) {
      if (searchError) return [];
      if (searchResults?.data) return searchResults.data;
      return [];
    } else if (enableBackendSearch && !debouncedSearchTerm.trim()) {
      return options;
    } else {
      return options.filter(
        (option) =>
          option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          option.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [
    enableBackendSearch,
    debouncedSearchTerm,
    searchResults,
    searchError,
    options,
    searchTerm,
  ]);

  const filteredOptions = getDisplayOptions();

  // =============== MAIN LOGIC ================
  const handleToggleItem = (item: SelectOption) => {
    // SINGLE SELECT MODE
    if (!isMultiple) {
      setSelectedItems([item]);
      onChange({ target: { name, value: [item] } });
      setIsOpen(false);
      if (setIsError) setIsError(false);
      return;
    }

    // MULTI SELECT MODE
    const isSelected = selectedItems.some(
      (selected) => selected.id === item.id
    );

    const newSelectedItems = isSelected
      ? selectedItems.filter((selected) => selected.id !== item.id)
      : [...selectedItems, item];

    setSelectedItems(newSelectedItems);

    onChange({ target: { name, value: newSelectedItems } });

    if (setIsError) setIsError(false);
  };

  const handleRemoveItem = (itemToRemove: SelectOption) => {
    const newSelectedItems = selectedItems.filter(
      (item) => item.id !== itemToRemove.id
    );
    setSelectedItems(newSelectedItems);
    onChange({ target: { name, value: newSelectedItems } });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // ============================================

  return (
    <div className={`flex flex-col gap-[6px] w-full ${divClassname}`}>
      {label && <CustomLabel labelText={label} />}
      <div className="relative" ref={dropdownRef}>
        <div
          className={`${className} min-h-[42px] max-h-[80px] overflow-auto border border-gray-300 rounded px-3 py-2 cursor-pointer flex items-center justify-between ${
            required && isError ? "border-red-500" : ""
          } ${selectedItems.length > 0 ? "bg-white" : "bg-transparent"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
            {selectedItems.length === 0 ? (
              <span className="text-gray-500">{placeholder}</span>
            ) : (
              selectedItems.map((item: SelectOption, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 bg-main-orange text-white text-sm px-2 py-1 rounded-full"
                >
                  <span className="truncate max-w-[120px]" title={item.name}>
                    {item.name}
                  </span>

                  {isMultiple && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item);
                      }}
                      className="hover:bg-main-orange/10 rounded-full p-0.5"
                    >
                      <X size={12} />
                    </button>
                  )}
                </span>
              ))
            )}
          </div>
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded main-shadow max-h-max overflow-hidden">
            {searchable && (
              <div className="p-2 border-b border-gray-300">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Qidirish..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-main-orange focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            <div className="max-h-58 pb-2 overflow-y-auto">
              {isLoading || isSearching ? (
                <div className="p-4 text-center text-gray-500">
                  Yuklanmoqda...
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Natija topilmadi
                </div>
              ) : (
                filteredOptions.map((option: SelectOption, index: number) => {
                  const isSelected = selectedItems.some(
                    (selected) => selected.id === option.id
                  );

                  return (
                    <div
                      key={index}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
                        isSelected ? "bg-main-orange/10" : ""
                      }`}
                      onClick={() => handleToggleItem(option)}
                    >
                      {isMultiple && (
                        <div
                          className={`w-4 h-4 border-2 rounded ${
                            isSelected
                              ? "bg-main-orange border-main-orange"
                              : "border-gray-300"
                          } flex items-center justify-center`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 bg-white rounded-sm"></div>
                          )}
                        </div>
                      )}
                      <span className="flex-1">{option.name}</span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;
