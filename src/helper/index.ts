import localforage from "localforage";
import data from "../assets/data/index.json";
import { Task } from "../interfaces";

export async function getTasks() {
  await fakeNetwork();
  let tasks = (await localforage.getItem("tasks")) as Task[];
  if (!tasks) {
    tasks = [];
    return tasks;
  }

  return tasks.reverse();
}
export async function getTaskById(id: string) {
  if (!id) throw new Error(`Id is invalid`);

  await fakeNetwork();
  let tasks = (await localforage.getItem("tasks")) as Task[];
  if (!tasks) tasks = [];

  return tasks.find((item) => item.id === id);
}

export async function createTask(newTask: Task) {
  await fakeNetwork();
  let storedTasks = (await localforage.getItem("tasks")) as Task[];
  const result = await set([...storedTasks, newTask]);

  return result;
}

export async function updateTask(id: string, updates: Partial<Task>) {
  await fakeNetwork();
  let tasks = (await localforage.getItem("tasks")) as Task[];
  let task = tasks.find((item) => item.id === id);
  if (!task) throw new Error(`No task found for ${id}`);
  Object.assign(task, updates);
  await set(tasks);
  return tasks;
}

function set(tasks: Task[]) {
  return localforage.setItem("tasks", tasks);
}

export async function removeTask(selectedId: string | number) {
  let tasks = (await localforage.getItem("tasks")) as Task[];
  let index = tasks.findIndex((task) => task.id === selectedId);
  if (index > -1) {
    tasks.splice(index, 1);
    return set(tasks);
  }
  return false;
}

export async function clearAll() {
  await localforage
    .clear()
    .then(() => {
      console.log("all data cleared");
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function seeder() {
  await set(data as Task[]);
}

async function fakeNetwork() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 100);
  });
}
