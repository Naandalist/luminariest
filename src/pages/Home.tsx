import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import "react-quill/dist/quill.snow.css";
import Dropdown from "../components/atoms/Dropdown";
import data from "../assets/data/index.json";

import IconStar from "../assets/icons/IconStar";
import IconTrashLines from "../assets/icons/IconTrashLines";
import IconSearch from "../assets/icons/IconSearch";
import IconMenu from "../assets/icons/IconMenu";
import IconCaretDown from "../assets/icons/IconCaretDown";
import IconHorizontalDots from "../assets/icons/IconHorizontalDots";
import IconPencilPaper from "../assets/icons/IconPencilPaper";
import IconX from "../assets/icons/IconX";
import IconRestore from "../assets/icons/IconRestore";

import Sidebar from "../components/molecules/Sidebar";
import ButtonMenuForMobile from "../components/atoms/ButtonMenuForMobile";

export interface Task {
  id: number;
  title: string;
  date?: string;
  description: string;
  status: string;
  tag: string;
  priority: string;
}

interface Pager {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  startIndex: number;
  endIndex: number;
}

const Home = () => {
  const defaultParams = {
    id: null,
    title: "",
    description: "",
    tag: "",
    priority: "low",
  };

  const [selectedTab, setSelectedTab] = useState("");
  const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
  const [viewTaskModal, setViewTaskModal] = useState(false);

  const [allTasks, setAllTasks] = useState<Task[]>(data as Task[]);

  const [filteredTasks, setFilteredTasks] = useState<Task[]>(allTasks);
  const [pagedTasks, setPagedTasks] = useState<Task[]>(filteredTasks);
  const [searchTask, setSearchTask] = useState<string>("");
  const [selectedTask, setSelectedTask] = useState<
    Task | typeof defaultParams | null
  >(defaultParams);
  const [isPriorityMenu] = useState<number | null>(null);
  const [isTagMenu] = useState<number | null>(null);

  const [pager] = useState<Pager>({
    currentPage: 1,
    totalPages: 0,
    pageSize: 10,
    startIndex: 0,
    endIndex: 0,
  });

  useEffect(() => {
    searchTasks();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [selectedTab, searchTask, allTasks]);

  const searchTasks = (isResetPage: boolean = true) => {
    if (isResetPage) {
      pager.currentPage = 1;
    }

    let res: Task[];
    if (
      selectedTab === "complete" ||
      selectedTab === "important" ||
      selectedTab === "trash"
    ) {
      res = allTasks.filter((task: Task) => task.status === selectedTab);
    } else {
      res = allTasks.filter((task: Task) => task.status !== "trash");
    }

    if (selectedTab === "homework" || selectedTab === "officework") {
      res = res.filter((task: Task) => task.tag === selectedTab);
    } else if (
      selectedTab === "high" ||
      selectedTab === "medium" ||
      selectedTab === "low"
    ) {
      res = res.filter((task: Task) => task.priority === selectedTab);
    }
    setFilteredTasks([
      ...res.filter((task: Task) =>
        task.title?.toLowerCase().includes(searchTask)
      ),
    ]);
    getPager(
      res.filter((task: Task) => task.title?.toLowerCase().includes(searchTask))
    );
  };

  const getPager = (res: Task[]) => {
    setTimeout(() => {
      if (res.length) {
        pager.totalPages =
          pager.pageSize < 1 ? 1 : Math.ceil(res.length / pager.pageSize);
        if (pager.currentPage > pager.totalPages) {
          pager.currentPage = 1;
        }
        pager.startIndex = (pager.currentPage - 1) * pager.pageSize;
        pager.endIndex = Math.min(
          pager.startIndex + pager.pageSize - 1,
          res.length - 1
        );
        setPagedTasks(res.slice(pager.startIndex, pager.endIndex + 1));
      } else {
        setPagedTasks([]);
        pager.startIndex = -1;
        pager.endIndex = -1;
      }
    });
  };

  const setPriority = (task: Task, name: string = "") => {
    console.log("task: ", task);
    let item = filteredTasks.find((taskItem: Task) => taskItem.id === task.id);
    if (item) {
      item.priority = name;
      searchTasks(false);
    }
  };

  const setTag = (task: Task, name: string = "") => {
    let item = filteredTasks.find((taskItem: Task) => taskItem.id === task.id);
    if (item) {
      item.tag = name;
      searchTasks(false);
    }
  };

  const tabChanged = () => {
    setIsShowTaskMenu(false);
  };

  const taskComplete = (task: Task) => {
    let item = filteredTasks.find((taskItem: Task) => taskItem.id === task.id);
    if (item) {
      item.status = item.status === "complete" ? "" : "complete";
      searchTasks(false);
    }
  };

  const setImportant = (task: Task) => {
    console.log("task: ", task);
    let item = filteredTasks.find((taskItem: Task) => taskItem.id === task.id);
    if (item) {
      item.status = item.status === "important" ? "" : "important";
      searchTasks(false);
    }
  };

  const viewTask = (item: Task | null = null) => {
    setSelectedTask(item);
    setTimeout(() => {
      setViewTaskModal(true);
    });
  };

  const deleteTask = (task: Task, type: string = "") => {
    if (type === "delete") {
      task.status = "trash";
    }
    if (type === "deletePermanent") {
      setAllTasks(allTasks.filter((taskItem: Task) => taskItem.id !== task.id));
    } else if (type === "restore") {
      task.status = "";
    }
    searchTasks(false);
  };

  return (
    <div>
      <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
        <Sidebar
          isShowTaskMenu={isShowTaskMenu}
          selectedTab={selectedTab}
          allTasks={allTasks}
          tabChanged={tabChanged}
          setSelectedTab={setSelectedTab}
        />
        <ButtonMenuForMobile
          isShowTaskMenu={isShowTaskMenu}
          setIsShowTaskMenu={setIsShowTaskMenu}
        />
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
                  <input
                    type="text"
                    className="form-input peer !pr-10"
                    placeholder="Search Task..."
                    value={searchTask}
                    onChange={(e) => setSearchTask(e.target.value)}
                    onKeyUp={() => searchTasks()}
                  />
                  <div className="absolute right-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                    <IconSearch />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center sm:justify-end sm:flex-auto flex-1">
                <p className="mr-3">
                  {pager.startIndex +
                    1 +
                    "-" +
                    (pager.endIndex + 1) +
                    " of " +
                    filteredTasks.length}
                </p>
                <button
                  type="button"
                  disabled={pager.currentPage === 1}
                  className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 mr-3 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => {
                    pager.currentPage--;
                    searchTasks(false);
                  }}
                >
                  <IconCaretDown className="w-5 h-5 rotate-90" />
                </button>
                <button
                  type="button"
                  disabled={pager.currentPage === pager.totalPages}
                  className="bg-[#f4f4f4] rounded-md p-1 enabled:hover:bg-primary-light dark:bg-white-dark/20 enabled:dark:hover:bg-white-dark/30 disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={() => {
                    pager.currentPage++;
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
                            task.status === "complete"
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
                              disabled={selectedTab === "trash"}
                              onClick={() => taskComplete(task)}
                              defaultChecked={task.status === "complete"}
                            />
                          </td>
                          <td>
                            <div onClick={() => viewTask(task)}>
                              <div
                                className={`group-hover:text-primary font-semibold text-base whitespace-nowrap ${
                                  task.status === "complete"
                                    ? "line-through"
                                    : ""
                                }`}
                              >
                                {task.title}
                              </div>
                            </div>
                          </td>
                          <td className="w-1">
                            <div className="flex items-center justify-end  space-x-2">
                              {task.priority && (
                                <div className="dropdown">
                                  <Dropdown
                                    offset={[0, 5]}
                                    placement={"bottom-end"}
                                    btnClassName="align-middle"
                                    button={
                                      <span
                                        className={`badge rounded-full capitalize hover:top-0 hover:text-white ${
                                          task.priority === "medium"
                                            ? "badge-outline-primary hover:bg-primary"
                                            : task.priority === "low"
                                            ? "badge-outline-warning hover:bg-warning"
                                            : task.priority === "high"
                                            ? "badge-outline-danger hover:bg-danger"
                                            : task.priority === "medium" &&
                                              isPriorityMenu === task.id
                                            ? "text-white bg-primary"
                                            : task.priority === "low" &&
                                              isPriorityMenu === task.id
                                            ? "text-white bg-warning"
                                            : task.priority === "high" &&
                                              isPriorityMenu === task.id
                                            ? "text-white bg-danger"
                                            : ""
                                        }`}
                                      >
                                        {task.priority}
                                      </span>
                                    }
                                  >
                                    <ul className="text-sm text-medium">
                                      <li>
                                        <button
                                          type="button"
                                          className="w-full text-danger text-left"
                                          onClick={() =>
                                            setPriority(task, "high")
                                          }
                                        >
                                          High
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          type="button"
                                          className="w-full text-primary text-left"
                                          onClick={() =>
                                            setPriority(task, "medium")
                                          }
                                        >
                                          Medium
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          type="button"
                                          className="w-full text-warning text-left"
                                          onClick={() =>
                                            setPriority(task, "low")
                                          }
                                        >
                                          Low
                                        </button>
                                      </li>
                                    </ul>
                                  </Dropdown>
                                </div>
                              )}

                              {task.tag && (
                                <div className="dropdown">
                                  <Dropdown
                                    offset={[0, 5]}
                                    placement={"bottom-end"}
                                    btnClassName="align-middle"
                                    button={
                                      <span
                                        className={`badge rounded-full capitalize hover:top-0 hover:text-white ${
                                          task.tag === "homework"
                                            ? "badge-outline-success hover:bg-success"
                                            : task.tag === "officework"
                                            ? "badge-outline-info hover:bg-info"
                                            : task.tag === "homework" &&
                                              isTagMenu === task.id
                                            ? "text-white bg-success "
                                            : task.tag === "officework" &&
                                              isTagMenu === task.id
                                            ? "text-white bg-info "
                                            : ""
                                        }`}
                                      >
                                        {task.tag}
                                      </span>
                                    }
                                  >
                                    <ul className="text-sm text-medium">
                                      <li>
                                        <button
                                          type="button"
                                          className="text-success"
                                          onClick={() =>
                                            setTag(task, "homework")
                                          }
                                        >
                                          Team
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          type="button"
                                          className="text-info"
                                          onClick={() =>
                                            setTag(task, "officework")
                                          }
                                        >
                                          Update
                                        </button>
                                      </li>
                                      <li>
                                        <button
                                          type="button"
                                          onClick={() => setTag(task, "")}
                                        >
                                          None
                                        </button>
                                      </li>
                                    </ul>
                                  </Dropdown>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="w-1">
                            <p
                              className={`whitespace-nowrap text-white-dark font-medium ${
                                task.status === "complete" ? "line-through" : ""
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
                                    {selectedTab !== "trash" && (
                                      <>
                                        {task.status !== "complete" && (
                                          <li>
                                            <button
                                              type="button"
                                              onClick={() =>
                                                console.log("edit: ", task)
                                              }
                                            >
                                              <IconPencilPaper className="w-4.5 h-4.5 mr-2 shrink-0" />
                                              Edit
                                            </button>
                                          </li>
                                        )}
                                        <li>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              deleteTask(task, "delete")
                                            }
                                          >
                                            <IconTrashLines className="mr-2 shrink-0" />
                                            Delete
                                          </button>
                                        </li>
                                        {task.status !== "complete" && (
                                          <li>
                                            <button
                                              type="button"
                                              onClick={() => setImportant(task)}
                                            >
                                              <IconStar className="w-4.5 h-4.5 mr-2 shrink-0" />
                                              <span>
                                                {task.status === "important"
                                                  ? "Not Important"
                                                  : "Important"}
                                              </span>
                                            </button>
                                          </li>
                                        )}
                                      </>
                                    )}
                                    {selectedTab === "trash" && (
                                      <>
                                        <li>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              deleteTask(
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
                                              deleteTask(task, "restore")
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

        <Transition appear show={viewTaskModal} as={Fragment}>
          <Dialog
            as="div"
            open={viewTaskModal}
            onClose={() => setViewTaskModal(false)}
            className="relative z-[51]"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-[black]/60" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center px-4 py-8">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                    <button
                      type="button"
                      onClick={() => setViewTaskModal(false)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                    >
                      <IconX />
                    </button>
                    <div className="flex items-center flex-wrap gap-2 text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] pl-5  py-3 pr-[50px]">
                      <div>{selectedTask?.title}</div>
                    </div>
                    <div className="p-5">
                      <div
                        className="text-base prose"
                        dangerouslySetInnerHTML={{
                          __html: selectedTask?.description || "",
                        }}
                      ></div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default Home;
