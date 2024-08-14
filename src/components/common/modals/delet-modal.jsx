import { trash } from "@/assets";
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
import { Button } from "@/components/custom/button";
import useDelete from "@/hooks/use-delete";
import { Trash2, X } from "lucide-react";
import toast from "react-hot-toast";
import Spinner from "../Spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CommonButton from "@/components/ui/common-button";

const DeleteModal = ({
  endpoint,
  open,
  setOpen,
  msg = "Delete Successfully !",
  dataRefetch,
  id,
}) => {
  const { mutateAsync: deleteMutation, isLoading: deleteLoading } = useDelete({
    endpoint: endpoint,
  });

  const handleDelete = async () => {
    try {
      const res = await deleteMutation(id);
      toast.success(res?.data?.message || msg);
      await dataRefetch();
      setOpen(false);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 rounded-2xl overflow-hidden">
        <DialogHeader className="m-0">
          <DialogTitle className="flex justify-between items-center font-semibold text-[22px] px-4 py-3">
            Do You Want to Delete?
            <Button
              onClick={() => setOpen(false)}
              className="w-11 h-10 px-0 bg-white hover:bg-gray-100 text-black"
            >
              <X />
            </Button>
          </DialogTitle>
          <DialogDescription className="h-[106px] w-full px-4 py-0 m-0 border-t">
            <div className="flex space-x-5 h-full w-full items-center">
              <img src={trash} alt="trash" className="w-[64px] h-[64px]" />
              <div className="space-y-2">
                <h3 className="font-medium text-[20px] text-black">
                  Delete ?{" "}
                </h3>
                <p className="text-[18px] text-gray-500 ">
                  Are you sure you want to permanently delete ?
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="border-t w-full px-4 py-4">
          <DialogClose
            onClick={() => setOpen(false)}
            className="w-fit h-11 px-10 text-[20px] border rounded-lg"
          >
            Cancel
          </DialogClose>
          <CommonButton
            className="w-full h-11 bg-rose-100 hover:bg-rose-100 border border-rose-500 text-black text-[20px] flex justify-center items-center space-x-4"
            onClick={handleDelete}
          >
            {deleteLoading ? (
              <Spinner />
            ) : (
              <Trash2 className="w-6 h-6 text-rose-500" />
            )}{" "}
            <h3 className="">Delete Permanently</h3>
          </CommonButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
