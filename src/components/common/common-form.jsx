import { cn } from "@/lib/utils";

const InputField = ({ children, className }) => (
  <div
    className={cn("flex flex-col divide-y-[1.5px] overflow-hidden", className)}
  >
    {children}
  </div>
);

const Field = ({
  icon,
  title,
  value,
  className,
  valueicon,
  className2,
  isdel,
}) => (
  <InputField>
    <div className={cn("flex divide-x-[1.5px]", className)}>
      <div className="min-w-36 flex items-center text-nowrap px-4 space-x-2">
        {icon && icon}
        <p className="text-gray-700 text-[16px]">{title}</p>
      </div>
      <div className="w-full flex items-center justify-start  ">
        {valueicon && <div className="pl-2">{valueicon}</div>}
        <div
          className={cn(
            "py-2 w-full px-3 outline-none text-[16px] font-normal",
            className2
          )}
        >
          {isdel ? <del>{value}</del> : value}
        </div>
      </div>
    </div>
  </InputField>
);

const FieldVerticle = ({ icon, title, value, className }) => (
  <div className={cn("flex  px-4  py-2 items-center", className)}>
    {icon && <div className="px-4 items-center">{icon}</div>}
    <div className="flex flex-col">
      <h4 className="text-[17px] font-medium">{title}</h4>
      <h5 className="text-[15px] font-normal text-slate-400">{value}</h5>
    </div>
  </div>
);

const FieldTarget = ({ icon, title, val1, val2, val3, className }) => (
  <InputField>
    <div className={cn("flex items-center divide-x-[1.5px]", className)}>
      <div className="px-6 items-center text-[16px] text-gray-600 ">{title}</div>
      <div className="flex flex-col items-center justify-start divide-y-[1.5px] w-full">
        {val1 && <div className=" w-full py-1 px-3 text-[16px] text-gray-700 font-semibold">{val1}</div>}
        {val2 && <div className=" w-full py-1 px-3 text-[16px] text-gray-700 font-semibold">{val2}</div>}
        {val3 && (
          <div className=" w-full py-1 px-3 flex items-center space-x-2 ">
            {icon && <div className="">{icon}</div>}
            <h2 className="text-[16px] text-gray-700 font-semibold">{val3}</h2>
          </div>
        )}
      </div>
    </div>
  </InputField>
);

export { InputField, Field, FieldVerticle, FieldTarget };
