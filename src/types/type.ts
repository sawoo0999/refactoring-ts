import React from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

export interface Task {
  id: number;
  text: string;
  projectId: number | undefined | null;
}

export interface ProjectState {
  selectedProjectId: number | undefined | null;
  projects: Project[];
  tasks: Task[];
}

export interface NewProjectProps {
  onAdd: (projectDate: Omit<Project, "id">) => void;
  onCancel: () => void;
}

export interface NoProjectSelectedProps {
  onStartAddProject: () => void;
}

export interface SelectedProjectProps {
  project: Project | undefined;
  onDelete: () => void;
  onAddTask: (text: string) => void;
  onDeleteTask: (id: number) => void;
  tasks: Task[];
}

export interface SidebarProps {
  onStartAddProject: () => void;
  projects: Project[];
  onSelectProject: (id: number) => void;
  selectedProjectId: number | undefined | null;
}

export interface ModalRef {
  open: () => void;
}

export interface InputRef {
  value: string;
}

export interface InputProps {
  label: string;
  type?: string;
  isTextarea?: boolean;
}

export interface ModalProps {
  children: React.ReactNode;
  buttonCaption: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export interface TaskProps {
  tasks: Task[];
  onAdd: (text: string) => void;
  onDelete: (id: number) => void;
}

export interface NewTaskProps {
  onAdd: (text: string) => void;
}
