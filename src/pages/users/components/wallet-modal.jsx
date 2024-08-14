import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useUpdate from "@/hooks/use-update";
import { Wallet, X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const WalletModal = ({ open, setOpen, endpoint, wallet, dataRefetch, id }) => {
  const { mutateAsync: updateWallet } = useUpdate({
    endpoint: endpoint + id,
    isMultiPart: false,
  });

  const validationSchema = Yup.object().shape({
    walletAmount: Yup.number()
      .required("Amount is required")
      .min(1, "Amount must be greater than 0"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await updateWallet(values);
      dataRefetch();
      setOpen(false);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <DialogHeader>
          <DialogTitle className="p-4">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-[22px]">Wallet Amount</h2>
              <div className="flex gap-3">
                <div className="px-2 h-10 cursor-pointer hover:shadow-md flex items-center justify-between shadow-sm shadow-gray-300 bg-white rounded-lg border space-x-2">
                  <Wallet size={20} className="ml-2" />
                  <p className="font-semibold text-[18px]">
                    $ {Math.round(wallet)}.00
                  </p>
                </div>
                <DialogClose
                  onClick={() => setOpen(false)}
                  className="h-10 w-11 border rounded-lg flex justify-center items-center shadow"
                >
                  <X size={20} />
                </DialogClose>
              </div>
            </div>
          </DialogTitle>
          <Separator />
          <div className="h-fit w-full">
            <Formik
              initialValues={{ walletAmount: wallet }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="h-full w-full items-start flex flex-col justify-center">
                <div className="px-4 py-4 w-full space-y-1.5">
                  <label className="py-2 text-base font-semibold text-gray-800">
                    Enter Amount
                  </label>
                  <Field
                    name="walletAmount"
                    as={Input}
                    className="mb-2 w-full flex items-center"
                    placeholder="Enter amount"
                  />
                  <ErrorMessage
                    name="walletAmount"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <Separator />
                <div className="w-full flex justify-end gap-4 p-4">
                  <DialogClose
                    onClick={() => setOpen(false)}
                    className="px-10 h-11 shadow-sm text-lg text-black border rounded-lg"
                  >
                    Cancel
                  </DialogClose>

                  <button
                    type="submit"
                    className="w-full shadow-sm h-11 hover:bg-slate-100 text-[20px] bg-white text-primary border flex justify-center items-center rounded-lg"
                  >
                    Change Wallet Amount
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
