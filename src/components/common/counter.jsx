import { MinusCircle, PlusCircle } from "lucide-react";

const Counter = ({ count = 0, onChange }) => {
  const increment = () => onChange(count + 1);
  const decrement = () => onChange(count > 0 ? count - 1 : 0);

  return (
    <div className="min-w-20 w-fit inline-flex items-center justify-between">
      <button type="button" className="w-fit h-fit outline-none border-none">
        <MinusCircle size={20} className="text-gray-500" onClick={decrement} />
      </button>

      <p className="w-full font-semibold text-lg text-center">{count}</p>

      <button type="button" className="w-fit h-fit outline-none border-none">
        <PlusCircle size={20} className="text-gray-500" onClick={increment} />
      </button>
    </div>
  );
};

export default Counter;
