import { DataTable } from "@/components/common/Table/data-table";
import { tasks } from "./data/task"; 
import { columns } from "./components/columns";
import { DataTableToolbar } from "./components/data-table-toolbar";
export default function Tasks () {
    return (
        <DataTable data={tasks} columns={columns} DataTableToolbar={DataTableToolbar}/>
    )
}