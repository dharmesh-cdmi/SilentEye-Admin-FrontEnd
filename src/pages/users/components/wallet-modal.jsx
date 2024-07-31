import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Wallet, X } from "lucide-react";

const WalletModal = ({
  open,
  setOpen,
  //   endpoint,
  //   msg = "Delete Successfully !",
  //   dataRefetch,
  //   id,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex justify-between">
              <h2 className="font-semibold text-[22px] "> Wallet Amount </h2>
              <div className="flex space-x-3">
                <div
                  className=" px-2 h-10 cursor-pointer hover:shadow-md flex items-center  justify-between shadow-sm shadow-gray-300  bg-white rounded-lg border space-x-2"
                  onClick={() => setOpen(false)}
                >
                  <Wallet size={20} className="ml-2" />
                  <p className="font-semibold text-[18px]">$ 200.00</p>
                </div>
                <AlertDialogCancel onClick={() => setOpen(false)} className="h-10">
                  <X size={20} />
                </AlertDialogCancel>
              </div>
            </div>
          </AlertDialogTitle>
          <Separator />
          <AlertDialogDescription className="h-[106px] w-[420px]">
            <div className="h-full items-start flex flex-col justify-center">
              <h3 className="py-2 text-[16px] font-semibold text-gray-800 ">
                Enter Amount
              </h3>
              <Input name="amount" />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-t w-full pt-4">
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            className="w-[79px] h-[40px] text-[20px] shadow-sm text-lg"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-[50%] shadow-sm h-[40px] hover:bg-slate-100 text-[20px] bg-white text-primary border flex justify-center items-center space-x-4"
            onClick={async () => {
              // await deleteEntry(entry);
              console.log("Delete Click ", entry);
            }}
          >
            <h3 className="text-lg">Change Wallet Amount</h3>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WalletModal;
