import { Button } from "@/components/custom/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export function DataTablePagination({ table, pagination }) {
  const pageSize = table.getState().pagination.pageSize;
  const currentPageIndex = table.getState().pagination.pageIndex;
  const totalPageCount = table.getPageCount();
  const totalFilteredRows = table.getFilteredRowModel().rows.length;
  const totalSelected = table.getFilteredSelectedRowModel().rows.length;
  const isSelected = totalSelected > 0;

  const rowsDisplayed = Math.min(
    pageSize * (currentPageIndex + 1),
    totalFilteredRows
  );
  return (
    <div className="flex items-center justify-between overflow-auto px-4 py-3  border-t ">
      <div className="min-w-fit flex items-center flex-nowrap gap-1.5 text-base">
        <p className="inline-flex items-center flex-nowrap gap-1">
          Showing {rowsDisplayed} /
          <span className="text-muted-foreground">{totalFilteredRows}</span>
        </p>
        <p className="inline-flex items-center flex-nowrap gap-1">
          (Page {currentPageIndex} of
          <span className="text-muted-foreground">{totalPageCount}</span>)
        </p>
        {isSelected && (
          <p className="inline-flex items-center flex-nowrap">
            Selected {table.getFilteredSelectedRowModel().rows.length} /
            {totalFilteredRows}
          </p>
        )}
      </div>
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          {/* <p className="hidden text-sm font-medium sm:block">Rows per page</p> */}
          <Select
            value={`${pagination.limit}`}
            onValueChange={(value) => {
              pagination.setLimit(Number(value));
            }}
          >
            <SelectTrigger className="h-10 w-[70px]">
              <SelectValue placeholder={pagination.limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {/* Page {table.getState().pagination.pageIndex + 1} of{" "} */}
          {/* {table.getPageCount()} */}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
