import { graph } from "@/assets";

const HomeCard = ({
  title = "Heelo",
  value = "20005k",
  isImage = true,
  amount,
}) => {
  return (
    <div className="rounded-lg border shadow-md min-w-[208px] max-w-[250px] h-[143px] overflow-hidden">
      <div className="px-5">
        <p className="text-muted-foreground pt-2">{title}</p>
        <p className="text-primary lg:text-[22px] text-[18px] font-bold py-3">
          {value}
        </p>
      </div>
      {isImage ? (
        <img src={graph} alt="graph" className="w-full " />
      ) : (
        <div className="flex items-center justify-center px-4">
          <div className="bg-gradient-to-l from-green-300 via-green-600 to-green-300 text-transparent bg-clip-text font-medium text-[24px]">
            {amount}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default HomeCard;
