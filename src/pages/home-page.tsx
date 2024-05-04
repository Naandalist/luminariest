import React from "react";
import {
  IconMenu,
  IconCaretDown,
  IconHorizontalDots,
  IconPencilPaper,
  IconSearch,
  IconRestore,
  IconTrashLines,
  IconInfoTriangle,
} from "../assets/icons";
import { Dropdown, Sidebar } from "../components";
import { getTasks, updateTask, removeTask } from "../helper";
import { useNavigate, useLoaderData, Link } from "react-router-dom";
import { Task, Pagination } from "../interfaces";

export async function loader({ request }) {
  const url = new URL(request.url);
  const label = url.searchParams.get("label");
  const tag = url.searchParams.get("tag");
  const priority = url.searchParams.get("priority");
  const q = url.searchParams.get("q");

  let tasks: Task[] = [];
  let filterKey: string = "";

  if (label) filterKey = label;
  if (tag) filterKey = tag;
  if (priority) filterKey = priority;

  tasks = (await getTasks()) as Task[];
  return { tasks, filterKey, q };
}

const HomePage = () => {
  const { tasks, filterKey, q } = useLoaderData() as {
    tasks: Task[];
    filterKey: string;
    q: string;
  };

  const navigate = useNavigate();

  const [isShowTaskMenu, setIsShowTaskMenu] = React.useState(false);
  const [allTasks, setAllTasks] = React.useState<Task[]>(tasks as Task[]);
  const [filteredTask, setFilteredTasks] = React.useState(allTasks);
  const [pagedTasks, setPagedTasks] = React.useState<Task[]>(filteredTask);
  const [pagination] = React.useState<Pagination>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    startIndex: 0,
    endIndex: 0,
  });

  React.useEffect(() => {
    setAllTasks(tasks);
  }, [tasks]);

  React.useEffect(() => {
    searchTasks();
  }, [filterKey, allTasks, q]);

  /**
   * Filters the tasks based on the provided filterKey and searchTask, and updates the pagination accordingly.
   *
   * @param {boolean} isResetPage - If true, resets the current page of the pagination to 1.
   */
  const searchTasks = (isResetPage: boolean = true) => {
    if (isResetPage) {
      pagination.currentPage = 1;
    }

    const filteredRes = allTasks
      .filter((task: Task) => {
        if (
          filterKey === "done" ||
          filterKey === "important" ||
          filterKey === "trash"
        ) {
          return task.label === filterKey;
        } else {
          return task.label !== "trash";
        }
      })
      .filter((task: Task) => {
        if (filterKey === "homework" || filterKey === "officework") {
          return task.tag === filterKey;
        } else if (
          filterKey === "high" ||
          filterKey === "medium" ||
          filterKey === "low"
        ) {
          return task.priority === filterKey;
        } else {
          return true;
        }
      })
      .filter((task: Task) => task.title?.toLowerCase().includes(q || ""));

    console.log("filterKey: ", filterKey);
    setFilteredTasks(filteredRes);
    getPagination(filteredRes);
  };

  /**
   * Calculates the pagination for a given array of tasks.
   *
   * @param {Task[]} res - The array of tasks to paginate.
   * @return {void} This function does not return anything.
   */
  const getPagination = (res: Task[]) => {
    setTimeout(() => {
      if (res.length) {
        pagination.totalPages =
          pagination.pageSize < 1
            ? 1
            : Math.ceil(res.length / pagination.pageSize);
        if (pagination.currentPage > pagination.totalPages) {
          pagination.currentPage = 1;
        }
        pagination.startIndex =
          (pagination.currentPage - 1) * pagination.pageSize;
        pagination.endIndex = Math.min(
          pagination.startIndex + pagination.pageSize - 1,
          res.length - 1
        );
        setPagedTasks(
          res.slice(pagination.startIndex, pagination.endIndex + 1)
        );
      } else {
        setPagedTasks([]);
        pagination.startIndex = -1;
        pagination.endIndex = -1;
      }
    });
  };

  const tabChanged = () => {
    setIsShowTaskMenu(false);
  };

  /**
   * Updates the label of a task to "done" if it is currently empty, and vice versa.
   *
   * @param {Task} task - The task to be updated.
   * @return {void} This function does not return anything.
   */
  const handleTaskToComplete = (task: Task) => {
    let item = filteredTask.find((taskItem: Task) => taskItem.id === task.id);
    if (item) {
      item.label = item.label === "done" ? "" : "done";

      updateTask(task.id, { label: item.label });
      searchTasks(false);
    }
  };

  /**
   * Updates the importance label of a task and triggers necessary updates.
   *
   * @param {Task} task - The task to be updated.
   * @return {void} This function does not return anything.
   */
  const handleTaskToImportant = (task: Task) => {
    let item = filteredTask.find((taskItem: Task) => taskItem.id === task.id);
    if (item) {
      item.label = item.label === "important" ? "" : "important";

      updateTask(task.id.toString(), { label: item.label });
      searchTasks(false);
    }
    navigate(".", { replace: true });
  };

  const onDeleteTask = (task: Task, type: string = "") => {
    if (type === "delete") {
      task.label = "trash";
    }

    if (type === "restore") {
      task.label = "";
    }

    if (type === "deletePermanent") {
      setAllTasks(allTasks.filter((taskItem: Task) => taskItem.id !== task.id));
      removeTask(task.id);
    }
    updateTask(task.id.toString(), { label: task.label });
    searchTasks(false);
    navigate(".", { replace: true });
  };

  const getPriorityStyle = (task: Task) => {
    switch (task.priority) {
      case "medium":
        return "text-white bg-primary";
      case "low":
        return "text-white bg-warning";
      case "high":
        return "text-white bg-danger";
      default:
        return "";
    }
  };

  const getTagStyle = (task: Task) => {
    if (task.tag === "homework") {
      return "text-white bg-success";
    } else if (task.tag === "officework") {
      return "text-white bg-info";
    } else {
      return "";
    }
  };

  return (
    <div>
      <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
        <Sidebar
          isShowTaskMenu={isShowTaskMenu}
          allTasks={allTasks}
          tabChanged={tabChanged}
          filterKey={filterKey}
        />
        <div
          className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden ${
            isShowTaskMenu && "!block xl:!hidden"
          }`}
          onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}
        ></div>
        <div className="panel p-0 flex-1 overflow-auto h-full">
          <div className="flex flex-col h-full">
            <div className="p-4 flex sm:flex-row flex-col w-full sm:items-center gap-4">
              <div className="mr-3 flex items-center">
                <button
                  type="button"
                  className="xl:hidden hover:text-primary block mr-3"
                  onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}
                >
                  <IconMenu />
                </button>
                <div className="relative group flex-1">
                  <form action="">
                    <input
                      className="form-input peer !pr-10"
                      name="q"
                      type="search"
                      placeholder="Search Task..."
                      onKeyUp={() => searchTasks()}
                    />
                    <div className="absolute right-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                      <IconSearch />
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-end sm:flex-auto flex-1">
                <p className="mr-3">
                  {pagination.startIndex +
                    1 +
                    "-" +
                    (pagination.endIndex + 1) +
                    " of " +
                    filteredTask.length}
                </p>
                <button
                  type="button"
                  disabled={pagination.currentPage === 1}
                  className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 mr-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => {
                    pagination.currentPage--;
                    searchTasks(false);
                  }}
                >
                  <IconCaretDown className="w-5 h-5 rotate-90" />
                </button>
                <button
                  type="button"
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => {
                    pagination.currentPage++;
                    searchTasks(false);
                  }}
                >
                  <IconCaretDown className="w-5 h-5 -rotate-90" />
                </button>
              </div>
            </div>
            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

            {pagedTasks.length ? (
              <div className="table-responsive grow overflow-y-auto sm:min-h-[300px] min-h-[400px]">
                <table className="table-hover">
                  <tbody>
                    {pagedTasks.map((task: any) => {
                      return (
                        <tr
                          className={`group cursor-pointer ${
                            task.label === "done"
                              ? "bg-white-light/30 dark:bg-[#1a2941]"
                              : ""
                          }`}
                          key={task.id}
                        >
                          <td className="w-1">
                            <input
                              type="checkbox"
                              id={`chk-${task.id}`}
                              className="form-checkbox"
                              disabled={filterKey === "trash"}
                              onClick={() => handleTaskToComplete(task)}
                              defaultChecked={task.label === "done"}
                            />
                          </td>
                          <td>
                            <Link
                              to={`/task/${task.id}`}
                              state={{
                                task: task,
                                props: {
                                  isShowTaskMenu,
                                  filterKey,
                                  allTasks,
                                },
                              }}
                            >
                              <div onClick={() => null}>
                                <div
                                  className={`group-hover:text-primary font-semibold text-base whitespace-nowrap ${
                                    task.label === "done" ? "line-through" : ""
                                  }`}
                                >
                                  {task.title}
                                </div>
                              </div>
                            </Link>
                          </td>
                          <td className="w-1">
                            <div className="flex items-center justify-end  space-x-2">
                              {task.priority && (
                                <div
                                  className={`badge rounded-full capitalize
                              ${getPriorityStyle(task)}`}
                                >
                                  {task.priority}
                                </div>
                              )}

                              {task.tag && (
                                <div
                                  className={`badge rounded-full capitalize ${getTagStyle(
                                    task
                                  )}`}
                                >
                                  {task.tag}
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="w-1">
                            <p
                              className={`whitespace-nowrap text-white-dark font-medium ${
                                task.label === "done" ? "line-through" : ""
                              }`}
                            >
                              {task.date}
                            </p>
                          </td>
                          <td className="w-1">
                            <div className="flex items-center justify-between w-max ml-auto">
                              <div className="dropdown">
                                <Dropdown
                                  offset={[0, 5]}
                                  placement={"bottom-end"}
                                  btnClassName="align-middle"
                                  button={
                                    <IconHorizontalDots className="rotate-90 opacity-70" />
                                  }
                                >
                                  <ul className="whitespace-nowrap">
                                    {filterKey !== "trash" && (
                                      <>
                                        {task.label !== "done" && (
                                          <Link to={`/task/${task.id}/edit`}>
                                            <li>
                                              <button
                                                type="button"
                                                onClick={() => null}
                                              >
                                                <IconPencilPaper className="w-4.5 h-4.5 mr-2 shrink-0" />
                                                Edit
                                              </button>
                                            </li>
                                          </Link>
                                        )}
                                        <li>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              onDeleteTask(task, "delete")
                                            }
                                          >
                                            <IconTrashLines className="mr-2 shrink-0" />
                                            Delete
                                          </button>
                                        </li>
                                        {task.label !== "done" && (
                                          <li>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                handleTaskToImportant(task)
                                              }
                                            >
                                              <IconInfoTriangle className="w-4.5 h-4.5 mr-2 shrink-0" />
                                              <span>
                                                {task.label === "important"
                                                  ? "Not Important"
                                                  : "Important"}
                                              </span>
                                            </button>
                                          </li>
                                        )}
                                      </>
                                    )}
                                    {filterKey === "trash" && (
                                      <>
                                        <li>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              onDeleteTask(
                                                task,
                                                "deletePermanent"
                                              )
                                            }
                                          >
                                            <IconTrashLines className="mr-2 shrink-0" />
                                            Permanent Delete
                                          </button>
                                        </li>
                                        <li>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              onDeleteTask(task, "restore")
                                            }
                                          >
                                            <IconRestore className="mr-2 shrink-0" />
                                            Restore Task
                                          </button>
                                        </li>
                                      </>
                                    )}
                                  </ul>
                                </Dropdown>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex justify-center items-center sm:min-h-[300px] min-h-[400px] font-semibold text-lg h-full">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
