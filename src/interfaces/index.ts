export interface Task {
  id: string;
  title: string;
  date?: string;
  description: string;
  label: string;
  tag: string;
  priority: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  startIndex: number;
  endIndex: number;
}

export interface SidebarProps {
  isShowTaskMenu: boolean;
  allTasks: Task[];
  tabChanged: () => void;
  filterKey: string;
}
