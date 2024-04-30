import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import IconListCheck from "../../assets/icons/IconListCheck";
import IconThumbUp from "../../assets/icons/IconThumbUp";
import IconPlus from "../../assets/icons/IconPlus";
import IconTrashLines from "../../assets/icons/IconTrashLines";
import IconTag from "../../assets/icons/IconTag";
import IconInfoTriangle from "../../assets/icons/IconInfoTriangle";
import { Task } from "../../pages/Home";

interface SidebarProps {
  isShowTaskMenu: boolean;
  selectedTab: string;
  allTasks: Task[];
  tabChanged: () => void;
  setSelectedTab: (tab: string) => void;
}

function Sidebar({
  isShowTaskMenu,
  selectedTab,
  allTasks,
  tabChanged,
  setSelectedTab,
}: SidebarProps) {
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
              <button
                className="btn btn-primary w-full"
                type="button"
                onClick={() => null}
              >
                <IconPlus className="mr-2 shrink-0" />
                Add New Task
              </button>
            </div>
          </div>
        </div>
        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b] mb-5"></div>
        <PerfectScrollbar className="relative pr-3.5 -mr-3.5 h-full grow">
          <div className="space-y-1">
            <button
              type="button"
              className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                selectedTab === ""
                  ? "bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]"
                  : ""
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab("");
              }}
            >
              <div className="flex items-center">
                <IconListCheck className="w-4.5 h-4.5 shrink-0" />
                <div className="ml-3">All Tasks</div>
              </div>
              <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                {allTasks &&
                  allTasks.filter((d) => d.status !== "trash").length}
              </div>
            </button>
            <button
              type="button"
              className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                selectedTab === "complete" &&
                "bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]"
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab("complete");
              }}
            >
              <div className="flex items-center">
                <IconThumbUp className="w-5 h-5 shrink-0" />
                <div className="ml-3">Done</div>
              </div>
              <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                {allTasks &&
                  allTasks.filter((d) => d.status === "complete").length}
              </div>
            </button>
            <button
              type="button"
              className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                selectedTab === "important" &&
                "bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]"
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab("important");
              }}
            >
              <div className="flex items-center">
                <IconInfoTriangle className="w-5 h-5 shrink-0" />
                <div className="ml-3">Important</div>
              </div>
              <div className="bg-primary-light dark:bg-[#060818] rounded-md py-0.5 px-2 font-semibold whitespace-nowrap">
                {allTasks &&
                  allTasks.filter((d) => d.status === "important").length}
              </div>
            </button>
            <button
              type="button"
              className={`w-full flex justify-between items-center p-2 hover:bg-white-dark/10 rounded-md dark:hover:text-primary hover:text-primary dark:hover:bg-[#181F32] font-medium h-10 ${
                selectedTab === "trash" &&
                "bg-gray-100 dark:text-primary text-primary dark:bg-[#181F32]"
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab("trash");
              }}
            >
              <div className="flex items-center">
                <IconTrashLines className="shrink-0" />
                <div className="ml-3">Trash</div>
              </div>
            </button>
            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
            <div className="text-white-dark px-1 py-3">Tags</div>
            <button
              type="button"
              className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-success hover:pl-3 duration-300 ${
                selectedTab === "homework" &&
                "pl-3 bg-gray-100 dark:bg-[#181F32]"
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab("homework");
              }}
            >
              <IconTag className="shrink-0" />
              <div className="ml-3">Home Work</div>
            </button>

            <button
              type="button"
              className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-info hover:pl-3 duration-300 ${
                selectedTab === "officework" &&
                "pl-3 bg-gray-100 dark:bg-[#181F32]"
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab("officework");
              }}
            >
              <IconTag className="shrink-0" />
              <div className="ml-3">Office Work</div>
            </button>
            <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>
            <div className="text-white-dark px-1 py-3">Priority Level</div>
            <button
              type="button"
              className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-warning hover:pl-3 duration-300 ${
                selectedTab === "low" && "pl-3 bg-gray-100 dark:bg-[#181F32]"
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab("low");
              }}
            >
              <IconTag className="shrink-0" />
              <div className="ml-3">Low</div>
            </button>

            <button
              type="button"
              className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-primary hover:pl-3 duration-300 ${
                selectedTab === "medium" && "pl-3 bg-gray-100 dark:bg-[#181F32]"
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab("medium");
              }}
            >
              <IconTag className="shrink-0" />
              <div className="ml-3">Medium</div>
            </button>
            <button
              type="button"
              className={`w-full flex items-center h-10 p-1 hover:bg-white-dark/10 rounded-md dark:hover:bg-[#181F32] font-medium text-danger hover:pl-3 duration-300 ${
                selectedTab === "high" && "pl-3 bg-gray-100 dark:bg-[#181F32]"
              }`}
              onClick={() => {
                tabChanged();
                setSelectedTab("high");
              }}
            >
              <IconTag className="shrink-0" />
              <div className="ml-3">High</div>
            </button>
          </div>
        </PerfectScrollbar>
      </div>
    </div>
  );
}

export default Sidebar;
