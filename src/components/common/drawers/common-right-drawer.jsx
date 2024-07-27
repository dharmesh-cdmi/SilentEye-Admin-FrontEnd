import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";

export function RightDrawer({ children, open, setOpen,title="Order Detail" }) {
  return (
    <Sheet open={open}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          
          <SheetTitle className="">
            <div className="flex justify-start space-x-3 items-center">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-lg border"
                onClick={() => setOpen(false)}
              >
                <ArrowLeft size={24} />
              </Button>
              <h2 className="text-[20px] line-clamp-1">{title}</h2>
            </div>
            </SheetTitle>
          
        </SheetHeader>
        {children}
        
        {/* <SheetFooter>
          <SheetClose onClick={() => setOpen(false)}>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
