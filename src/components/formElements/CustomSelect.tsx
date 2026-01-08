import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import CustomLabel from "./CustomLabel";

interface SelectOption {
  id: string | number;
  name: string;
}

interface CustomSelectProps {
  value?: string | number;
  options: SelectOption[];
  placeholder?: string;
  onChange: (e: { target: { name?: string; value: string } }) => void;
  className?: string;
  divClassname?: string;
  required?: boolean;
  isError?: boolean;
  setIsError?: (error: boolean) => void;
  label?: string;
  name?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  placeholder,
  onChange,
  className = "border-0",
  divClassname = "",
  required = false,
  isError,
  setIsError,
  label,
  name,
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full ${divClassname}`}>
      {label && <CustomLabel labelText={label} />}
      <Select
        value={value?.toString()}
        onValueChange={(val) => {
          onChange({ target: { name, value: val } });
          if (setIsError) {
            setIsError(false);
          }
        }}
      >
        <SelectTrigger
          className={`${className} !text-main-black text-sm  capitalize cursor-pointer pr-2 !ring-0 shadow-none ${
            required && isError ? "border-red-500" : ""
          }`}
        >
          <SelectValue placeholder={placeholder || "Выбрать"} />
        </SelectTrigger>
        <SelectContent className="shadow-none text-main-black bg-white border border-gray-200 focus:ring-0 focus:outline-none">
          {options.map((option) => (
            <SelectItem
              className="cursor-pointer capitalize"
              value={option?.id?.toString()}
              key={option?.id}
            >
              {option?.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
