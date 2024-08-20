import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const limits = [10, 20, 30, 40, 50];

export default function LimitSelector({ limit = 10, setLimit }) {
  return (
    <Select value={limit} onValueChange={setLimit}>
      <SelectTrigger className="w-16 h-11 shadow-sm text-lg rounded-lg">
        <SelectValue placeholder="Select a limit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {limits.map((val) => (
            <SelectItem key={val} value={val}>
              {val}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
