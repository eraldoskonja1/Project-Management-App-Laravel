import TableHeading from "@/Components/TableHeading";
import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import {
    PROJECT_STATUS_CLASS_MAP,
    PROJECT_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import { Link, router } from "@inertiajs/react";

export default function TasksTable({
    tasks,
    success,
    queryParams = null,
    hidetaskColumn = false,
}) {
    queryParams = queryParams || {};

    console.log("Tasks prop:", tasks);

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route("task.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route("task.index"), queryParams);
    };

    const deleteTask = (task) => {
        if (!window.confirm("Are you sure?")) {
            return;
        }
        router.delete(route("task.destroy", task.id));
    };

    return (
        <>
            {success && (
                <div className="bg-emerald-500 py-2 px-4 text-white rounded">
                    {success}
                </div>
            )}
            <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <TableHeading
                                name="id"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                ID
                            </TableHeading>
                            <th className="px-3 py-2">Image</th>
                            {!hidetaskColumn && (
                                <th className="px-3 py-2">task Name</th>
                            )}

                            <TableHeading
                                name="name"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Name
                            </TableHeading>
                            <TableHeading
                                name="status"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Status
                            </TableHeading>
                            <TableHeading
                                name="created_at"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Create Date
                            </TableHeading>
                            <TableHeading
                                name="due_date"
                                sort_field={queryParams.sort_field}
                                sort_direction={queryParams.sort_direction}
                                sortChanged={sortChanged}
                            >
                                Due Date
                            </TableHeading>
                            <th className="px-3 py-2">Created By</th>
                            <th className="px-3 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-2"></th>
                            <th className="px-3 py-2"></th>
                            {!hidetaskColumn && <th className="px-3 py-2"></th>}
                            <th className="px-3 py-2">
                                <TextInput
                                    className="w-full"
                                    defaultValue={queryParams.name}
                                    placeholder="Task Name"
                                    onBlur={(e) =>
                                        searchFieldChanged(
                                            "name",
                                            e.target.value
                                        )
                                    }
                                    onKeyPress={(e) => onKeyPress("name", e)}
                                />
                            </th>
                            <th className="px-3 py-2">
                                <SelectInput
                                    className="w-full"
                                    defaultValue={queryParams.status}
                                    onChange={(e) =>
                                        searchFieldChanged(
                                            "status",
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                            </th>
                            <th className="px-3 py-2">Create Date</th>
                            <th className="px-3 py-2">Due Date</th>
                            <th className="px-3 py-2">Created By</th>
                            <th className="px-3 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.data ? (
                            tasks.data.map((task) => (
                                <tr
                                    key={task.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <th className="px-3 py-3">{task.id}</th>
                                    <td className="px-3 py-3">
                                        <img
                                            src={task.image_path}
                                            style={{
                                                width: 60,
                                            }}
                                        />
                                    </td>
                                    {!hidetaskColumn && (
                                        <td className="px-3 py-3">
                                            {task.project.name}
                                        </td>
                                    )}
                                    <td className="px-3 py-3">
                                        <Link href={route("task.show", task.id)}>
                                            {task.name}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-3">
                                        <span
                                            className={
                                                "px-2 py-1 rounded text-white " +
                                                PROJECT_STATUS_CLASS_MAP[
                                                    task.status
                                                ]
                                            }
                                        >
                                            {
                                                PROJECT_STATUS_TEXT_MAP[
                                                    task.status
                                                ]
                                            }
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 text-nowrap">
                                        {task.created_at}
                                    </td>
                                    <td className="px-3 py-3 text-nowrap">
                                        {task.due_date}
                                    </td>
                                    <td className="px-3 py-3">
                                        {task.createdBy.name}
                                    </td>
                                    <td className="px-3 py-3 text-right">
                                        <Link
                                            href={route("task.edit", task.id)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={(e) => deleteTask(task)}
                                            href={route("task.index")}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center p-5">
                                    No tasks found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {tasks && tasks.meta && tasks.meta.links ? (
                <Pagination links={tasks.meta.links} />
            ) : null}
        </>
    );
}
