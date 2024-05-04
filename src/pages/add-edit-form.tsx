import React from "react";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { IconMenu } from "../assets/icons";
import { Sidebar } from "../components";
import { useNavigate, useLoaderData } from "react-router-dom";
import { createTask, getTaskById, getTasks, updateTask } from "../helper";
import { Task } from "../interfaces";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export async function loader({ params }) {
  const task = params.taskId ? await getTaskById(params.taskId) : null;
  const allTasks = await getTasks();

  return { task, allTasks };
}

function AddEditForm() {
  const navigate = useNavigate();

  const { task, allTasks } = useLoaderData() as {
    task: Task;
    allTasks: Task[];
  };

  const [isShowTaskMenu, setIsShowTaskMenu] = React.useState<boolean>(false);

  const initialTask = {
    id: task ? task.id : uuidv4(),
    title: task ? task.title : "",
    date: dayjs().format(),
    description: task ? task.description : "",
    tag: task ? task.tag : "",
    priority: task ? task.priority : "",
    label: task ? task.label : "",
  };

  const [newTask, setNewTask] = React.useState<any>(initialTask);

  const tabChanged = () => {
    setIsShowTaskMenu(false);
  };

  const onHandleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (task) {
        await updateTask(task.id, newTask);
        showMessage("Task updated. Its now in your list", "success");
        navigate("/");
      } else {
        await createTask(newTask);
        showMessage("New task created. Its now in your list", "success");
        navigate("/");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const showMessage = (msg = "", type = "success") => {
    const toast: any = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: "toast" },
    });
    toast.fire({
      icon: type,
      title: msg,
      padding: "10px 20px",
    });
  };

  return (
    <div className="flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full">
      <Sidebar
        tabChanged={tabChanged}
        isShowTaskMenu={isShowTaskMenu}
        allTasks={allTasks}
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
          <div>
            <div className="pt-5 grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div className="p-6 lg:col-span-2">
                <div className="flex items-center mb-5 ">
                  <button
                    type="button"
                    className="xl:hidden hover:text-primary block mr-3"
                    onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}
                  >
                    <IconMenu />
                  </button>
                  <h5 className="font-semibold text-lg dark:text-white-light">
                    {task ? "Edit Data" : "Add New Task"}
                  </h5>
                </div>
                <div className="mb-5">
                  <form className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <div className="md:col-span-2">
                        <label htmlFor="title">Title</label>
                        <input
                          id="title"
                          type="text"
                          placeholder="Enter Title"
                          className="form-input"
                          value={newTask.title}
                          onChange={(e) => {
                            setNewTask({
                              ...newTask,
                              title: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor="gridState">Tag</label>
                        <select
                          id="tag"
                          className="form-select"
                          value={newTask.tag}
                          onChange={(e) => {
                            setNewTask({ ...newTask, tag: e.target.value });
                          }}
                        >
                          <option value="">...</option>
                          <option value="homework">Homework</option>
                          <option value="officework">Officework</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="gridState">Priority</label>
                        <select
                          id="priority"
                          className="form-select"
                          value={newTask.priority}
                          onChange={(e) => {
                            setNewTask({
                              ...newTask,
                              priority: e.target.value,
                            });
                          }}
                        >
                          <option value="">...</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                    <div className="mb-5">
                      <label>Description</label>
                      <ReactQuill
                        theme="snow"
                        value={newTask.description}
                        defaultValue={"Enter description"}
                        onChange={(content, delta, source, editor) => {
                          setNewTask({ ...newTask, description: content });
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary !mt-6"
                      onClick={(e) => onHandleSubmit(e)}
                    >
                      {task ? "Update" : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEditForm;
