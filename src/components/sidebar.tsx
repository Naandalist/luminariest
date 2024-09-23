import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { SidebarProps } from "../interfaces";
import { Link } from "react-router-dom";
import {
  IconListCheck,
  IconThumbUp,
  IconPlus,
  IconTag,
  IconInfoTriangle,
  IconTrashLines,
} from "../assets/icons";

function Sidebar({
  isShowTaskMenu,
  allTasks,
  tabChanged,
  filterKey,
  totalAllTask,
}: SidebarProps) {
  const groupButtonLabelComponent = () => {
    return (
      <>
        <Link to="/">
          <button
            type="button"
            className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
              filterKey === ""
                ? "bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]"
                : ""
            }`}
            onClick={() => {
              tabChanged();
            }}
          >
            <div className="flex items-center">
              <IconListCheck className="w-4.5 h-4.5 shrink-0" />
              <div className="ml-3"> Tasks</div>
            </div>
            {!filterKey && (
              <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                {totalAllTask}
              </div>
            )}
          </button>
        </Link>
        <Link to="/?label=done">
          <button
            type="button"
            className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
              filterKey === "done" &&
              "bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]"
            }`}
            onClick={() => {
              tabChanged();
            }}
          >
            <div className="flex items-center">
              <IconThumbUp className="w-5 h-5 shrink-0" />
              <div className="ml-3">Done</div>
            </div>
            {filterKey === "done" && (
              <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                {allTasks
                  ? allTasks.filter((d) => d.label === "done").length
                  : null}
              </div>
            )}
          </button>
        </Link>
        <Link to="/?label=important">
          <button
            type="button"
            className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
              filterKey === "important" &&
              "bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]"
            }`}
            onClick={() => {
              tabChanged();
            }}
          >
            <div className="flex items-center">
              <IconInfoTriangle className="w-5 h-5 shrink-0" />
              <div className="ml-3">Important</div>
            </div>
            {filterKey === "important" && (
              <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                {allTasks
                  ? allTasks.filter((d) => d.label === "important").length
                  : null}
              </div>
            )}
          </button>
        </Link>
        <Link to="/?label=trash">
          <button
            type="button"
            className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
              filterKey === "trash" &&
              "bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]"
            }`}
            onClick={() => console.log("huhu")}
          >
            <div className="flex items-center">
              <IconTrashLines className="shrink-0" />
              <div className="ml-3">Trash</div>
            </div>
            {filterKey === "trash" && (
              <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                {allTasks
                  ? allTasks.filter((d) => d.label === "trash").length
                  : null}
              </div>
            )}
          </button>
        </Link>
      </>
    );
  };

  const groupButtonTagComponent = () => {
    return (
      <>
        <Link to="/?tag=homework">
          <button
            type="button"
            className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-success hover:pl-3 duration-300 ${
              filterKey === "homework" && "pl-3 bg-gray-100 dark:bg-[#181F32]"
            }`}
            onClick={() => {
              tabChanged();
            }}
          >
            <IconTag className="shrink-0" />
            <div className="ml-3">Home Work</div>
          </button>
        </Link>
        <Link to="/?tag=officework">
          <button
            type="button"
            className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-info hover:pl-3 duration-300 ${
              filterKey === "officework" && "pl-3 bg-gray-100 dark:bg-[#181F32]"
            }`}
            onClick={() => {
              tabChanged();
            }}
          >
            <IconTag className="shrink-0" />
            <div className="ml-3">Office Work</div>
          </button>
        </Link>
      </>
    );
  };
  const groupButtonPriorityComponent = () => {
    return (
      <>
        <Link to="/?priority=low">
          <button
            type="button"
            className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-warning hover:pl-3 duration-300 ${
              filterKey === "low" && "pl-3 bg-gray-100 dark:bg-[#181F32]"
            }`}
            onClick={() => {
              tabChanged();
            }}
          >
            <IconTag className="shrink-0" />
            <div className="ml-3">Low</div>
          </button>
        </Link>
        <Link to="/?priority=medium">
          <button
            type="button"
            className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-primary hover:pl-3 duration-300 ${
              filterKey === "medium" && "pl-3 bg-gray-100 dark:bg-[#181F32]"
            }`}
            onClick={() => {
              tabChanged();
            }}
          >
            <IconTag className="shrink-0" />
            <div className="ml-3">Medium</div>
          </button>
        </Link>
        <Link to="/?priority=high">
          <button
            type="button"
            className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-danger hover:pl-3 duration-300 ${
              filterKey === "high" && "pl-3 bg-gray-100 dark:bg-[#181F32]"
            }`}
            onClick={() => {
              tabChanged();
            }}
          >
            <IconTag className="shrink-0" />
            <div className="ml-3">High</div>
          </button>
        </Link>
      </>
    );
  };

  return (
    <div
      className={`panel p-4 flex-none w-[240px] max-w-full absolute xl:relative z-10 space-y-4 xl:h-auto h-full xl:block xl:rounded-r-md rounded-r-none hidden ${
        isShowTaskMenu && "!block"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="pb-5">
          <div className="flex text-center items-center">
            <div className="left-0 p-4 w-full">
              <Link
                to="/new-task"
                state={{
                  props: {
                    isShowTaskMenu,
                    allTasks,
                    filterKey,
                  },
                }}
              >
                <div className="btn btn-primary w-full">
                  <IconPlus className="mr-2 shrink-0" />
                  Add New Task
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] mb-5"></div>
        <PerfectScrollbar className="relative pr-3.5 -mr-3.5 h-full grow">
          <div className="space-y-1">
            {groupButtonLabelComponent()}
            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
            <div className="text-white-dark px-1 py-3">Tags</div>
            {groupButtonTagComponent()}
            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
            <div className="text-white-dark px-1 py-3">Priority Level</div>
            {groupButtonPriorityComponent()}
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default Sidebar;
