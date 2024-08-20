import { Button } from "@/components/custom/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DataTablePagination({ pagination }) {
  const { limit, currentPage, setCurrentPage, totalData } = pagination;

  const totalPageCount = Math.ceil(totalData / limit);
  const rowsDisplayed = Math.min(limit * currentPage, totalData);
  const isPreviousPageAvailable = currentPage > 1;
  const isNextPageAvailable = currentPage < totalPageCount;

  return (
    <div className="flex items-center justify-between overflow-auto px-4 py-3  border-t ">
      <div className="min-w-fit flex items-center flex-nowrap gap-1.5 text-base">
        <p className="inline-flex items-center flex-nowrap gap-1">
          Showing {rowsDisplayed || 0} /
          <span className="text-muted-foreground">{totalData || 0}</span>
        </p>
        <p className="inline-flex items-center flex-nowrap gap-1">
          (Page {currentPage || 0} of
          <span className="text-muted-foreground">{totalPageCount || 1}</span>)
        </p>
      </div>
      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        {/* <div className="flex items-center space-x-2">
          <Select
            value={`${limit}`}
            onValueChange={(value) => {
              setLimit(Number(value));
              setCurrentPage(1); // Reset to first page when limit changes
            }}
          >
            <SelectTrigger className="h-10 w-[70px]">
              <SelectValue placeholder={limit} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
        <div className="flex items-center space-x-2">
          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setCurrentPage(1)}
            disabled={!isPreviousPageAvailable}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button> */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={!isPreviousPageAvailable}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-1 border border-primary opacity-100"
            disabled={false}
          >
            {currentPage}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={!isNextPageAvailable}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setCurrentPage(totalPageCount)}
            disabled={!isNextPageAvailable}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button> */}
        </div>
      </div>
    </div>
  );
}
