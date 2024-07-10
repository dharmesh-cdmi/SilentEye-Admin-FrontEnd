import { refund } from "@/assets";
import { RefundIcons } from "@/assets/icons";
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

const RefundModal = ({ entry = "delete click", open, setOpen }) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-semibold text-[22px] border-b pb-2">
            Do You Want initiate Refund ?
          </AlertDialogTitle>
          <AlertDialogDescription className="h-[106px] w-[420px]">
            <div className="flex space-x-5 h-full w-full justify-center items-center">
              <img src={refund} alt="trash" className="w-[64px] h-[64px]" />
              <div className="space-y-2">
                <h3 className="font-semibold text-[20px]">Refund ? </h3>
                <p className="text-[18px] text-gray-500 ">
                  {" "}
                  Are you sure you want to initiate Refund ?
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-t w-full pt-4">
          <AlertDialogCancel onClick={() => setOpen(false)} className="w-[79px] h-[40px] text-[20px]">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
          className="w-[80%] h-[40px] text-[20px] flex justify-center items-center space-x-4"
            onClick={async () => {
              // await deleteEntry(entry);
              console.log("Delete Click ", entry);
            }}
          >
            <RefundIcons size={20}/> <h3 className="">Initiate Refund</h3>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RefundModal;
