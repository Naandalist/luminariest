import React from "react";
import { Sidebar } from "../components";
import { IconArrowBackward, IconMenu } from "../assets/icons";
import { Link, useLoaderData } from "react-router-dom";
import { getTaskById, getTasks } from "../helper";
import { Task } from "../interfaces";
export async function loader({ params }) {
  const task = await getTaskById(params.taskId);
  const allTasks = await getTasks();

  return { task, allTasks };
}

function DetailPage() {
  const { task, allTasks } = useLoaderData() as {
    task: Task;
    allTasks: Task[];
  };

  const [isShowTaskMenu, setIsShowTaskMenu] = React.useState<boolean>(false);

  const tabChanged = () => {
    setIsShowTaskMenu(false);
  };

  return (
    <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
      <Sidebar
        isShowTaskMenu={isShowTaskMenu}
        allTasks={allTasks}
        tabChanged={tabChanged}
        filterKey={""}
      />
      <div
        className={`overlay bg-black/60 z-[5] w-full h-full rounded-md absolute hidden ${
          isShowTaskMenu && "!block xl:!hidden"
        }`}
        onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}
      ></div>
      <div className="panel p-0 flex-1 overflow-auto">
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
                <Link to="/">
                  <div className="hover:text-primary block mr-3">
                    <div className="flex ">
                      <IconArrowBackward />
                      <p className="ml-3">Back</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]">
            <div className="p-4 space-y-5">
              <h5 className="font-semibold text-lg mb-4">{task.title}</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: task.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
