import { Button } from "../custom/button";

export default function CommonButton({children}) {
  return (
    <Button variant="ghost" className="h-11 rounded-md px-3 mb-1" >
      {/* <icon className="w-7 h-7 p-1 text-primary" /> */}
      {children}
    </Button>
  );
}
