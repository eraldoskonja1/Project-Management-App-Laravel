import {
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constants.jsx";
import {
    TASK_PRIORITY_CLASS_MAP ,
    TASK_PRIORITY_TEXT_MAP ,
} from "@/constants.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import TasksTable from "../Task/TasksTable";

export default function Show({ auth, task, tasks, queryParams }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-white-800 dark:text-white-200 leading-tight">
                    {`Task "${task.name}"`}
                </h2>
            }
        >
            <Head title={`Task "${task.name}"`}></Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-white-900 dark:text-white-100">
                            <img
                                src={task.image_path}
                                alt=""
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div className="grid gap-1 grid-cols-2 mt-2">
                            <div>
                                <div className="ml-4">
                                    <label className="font-bold text-white text-lg">
                                        Task ID
                                    </label>
                                    <p className="mt-1 text-white">{task.id}</p>
                                </div>
                                <div className="mt-4 ml-4">
                                    <label className="font-bold text-white text-lg">
                                        Task Name
                                    </label>
                                    <p className="mt-1 text-white">{task.name}</p>
                                </div>
                                <div className="mt-4 ml-4 text-white">
                                    <label className="font-bold text-white text-lg">
                                        Task Status
                                    </label>
                                    <p className="mt-1 text-white">
                                        <span
                                            className={
                                                "px-2 py-1 rounded text-white " +
                                                TASK_STATUS_CLASS_MAP[
                                                    task.status
                                                ]
                                            }
                                        >
                                            {
                                                TASK_STATUS_TEXT_MAP[
                                                    task.status
                                                ]
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4 ml-4 text-white">
                                    <label className="font-bold text-white text-lg">
                                        Task Priority
                                    </label>
                                    <p className="mt-1 text-white">
                                        <span
                                            className={
                                                "px-2 py-1 rounded text-white " +
                                                TASK_PRIORITY_CLASS_MAP[
                                                    task.priority
                                                ]
                                            }
                                        >
                                            {
                                                TASK_PRIORITY_TEXT_MAP[
                                                    task.priority
                                                ]
                                            }
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-4 text-white ml-4">
                                    <label className="font-bold text-white text-lg">
                                        Created By
                                    </label>
                                    <p className="mt-1 text-white">
                                        {task.createdBy.name}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="font-bold text-white text-lg">
                                        Due Date
                                    </label>
                                    <p className="mt-1 text-white">{task.due_date}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-white text-lg">
                                        Create Date
                                    </label>
                                    <p className="mt-1 text-white">{task.created_at}</p>
                                </div>
                                <div>
                                    <label className="font-bold text-white text-lg">
                                        Update By
                                    </label>
                                    <p className="mt-1 text-white">
                                        {task.updatedBy.name}
                                    </p>
                                </div>
                                <div>
                                    <label className="font-bold text-white text-lg">
                                        Project
                                    </label>
                                    <p className="mt-1">
                                        <Link href={route("project.show", task.project.id)} className="hover:underline text-white">{task.project.name}</Link>
                                    </p>
                                </div>
                                <div>
                                    <label className="font-bold text-white text-lg">
                                        Assigned User
                                    </label>
                                    <p className="mt-1 text-white">
                                        {task.updatedBy.name}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 text-white ml-4">
                                <label className="font-bold text-white text-lg">
                                    Task Description
                                </label>
                                <p className="mt-1 text-white">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <TasksTable tasks={tasks} queryParams={queryParams} hideTaskColumn={true} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
