import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft } from "lucide-react";

const CommonModal = ({ open, setOpen, title, children, width = 600 }) => {
  return (
    <AlertDialog open={open} className="min-w-full">
      <AlertDialogContent className={`min-w-[${width}px]`}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex px-4 justify-start items-center space-x-4">
              <div
                onClick={() => setOpen(false)}
                className="cursor-pointer border rounded-lg p-2 hover:bg-slate-50"
              >
                <ArrowLeft className="w-6 h-6" />
              </div>
              <div className="text-[22px] font-[500] ">{title}</div>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="">
            <div>{children}</div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CommonModal;
