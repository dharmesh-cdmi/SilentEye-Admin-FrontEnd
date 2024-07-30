import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './data-table-pagination';
import axios from 'axios';
import { Checkbox } from '@/components/ui/checkbox'; // Assuming you are using this component

export function DataTable({ columns, data, DataTableToolbar }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [sorting, setSorting] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleDeleteAll = async () => {
    const selectedIds = Object.keys(rowSelection).map(key => table.getRowModel().rows[parseInt(key)].original.id);
    try {
      await axios.post('/api/delete', { ids: selectedIds });
      // Handle successful delete, e.g., refresh table data
    } catch (error) {
      console.error('Failed to delete selected rows:', error);
    }
  };

  const handleBlockAll = async () => {
    const selectedIds = Object.keys(rowSelection).map(key => table.getRowModel().rows[parseInt(key)].original.id);
    try {
      await axios.post('/api/block', { ids: selectedIds });
      // Handle successful block, e.g., refresh table data
    } catch (error) {
      console.error('Failed to block selected rows:', error);
    }
  };

  return (
    <div className='border rounded-b-lg'>
      <div className="flex justify-between">
        {Object.keys(rowSelection)?.length > 0 ? (
          <div className="flex items-center p-4">
            <Checkbox
              checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
              className="translate-y-[2px] mr-4"
            />
            <button className="btn btn-danger" onClick={handleDeleteAll}>Delete All</button>
            <button className="btn btn-warning ml-2" onClick={handleBlockAll}>Block All</button>
          </div>
        ) : (
          DataTableToolbar && <DataTableToolbar table={table} />
        )}
      </div>
      <div className=''>
        <Table>
          {Object.keys(rowSelection)?.length === 0 && (
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          )}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell?.column?.columnDef.cell,
                        cell?.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
