import { useState } from "react";
import NewProject from "./component/NewProject";
import NoProjectSelected from "./component/NoProjectSelected";
import Sidebar from "./component/Sidebar";
import SelectedProject from "./component/SelectedProject";
import { Project, ProjectState, Task } from "./types/type";

function App() {
  const [projectsState, setProjectsState] = useState<ProjectState>({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  //업무 추가 함수
  function handleAddTask(text: string): void {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      //받아온 데이터를 새변수에 분해해서 넣기 + 고유 아이디 생성
      const newTask: Task = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };
      //기본값 분해해서 넣고 projects 안에 새변수 삽입 원래있던 projects 배열도  분해해서 삽입
      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  //업무 삭제 함수
  function handleDeleteTask(id: number): void {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: projectsState.tasks.filter((task) => task.id !== id),
      };
    });
  }

  //SelectedProject Delete 버튼 실행 버튼
  function handleRemoveProject(): void {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: projectsState.projects.filter(
          (project) => project.id !== projectsState.selectedProjectId
        ),
      };
    });
  }

  //Sidebar 게시글 선택시 표시 함수
  function handleSelectProject(id: number): void {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  //selectedProjectId null로 변경해서 component변경
  function handleStartAddProject(): void {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }
  //selectedProjectId undefined로 변경해서 component변경
  function handleCancelAddProject(): void {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  //State안에 projects 배열에 새로운 오브젝트 넣는 함수
  function handleAddProject(projectDate: Omit<Project, "id">): void {
    setProjectsState((prevState) => {
      const projectId = Math.random();
      //받아온 데이터를 새변수에 분해해서 넣기 + 고유 아이디 생성
      const newProject = {
        ...projectDate,
        id: projectId,
      };
      //기본값 분해해서 넣고 projects 안에 새변수 삽입 원래있던 projects 배열도  분해해서 삽입
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleRemoveProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  //selectedprojectid 가 undefined 면 초기화면 null이면 생성화면
  if (projectsState.selectedProjectId === undefined) {
    //초기화면일때 State 값을 변경해주는 함수를 props로 넣어주기
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  } else if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  }

  return (
    <>
      <main className="h-screen my-8 flex gap-8">
        <Sidebar
          onStartAddProject={handleStartAddProject}
          projects={projectsState.projects}
          onSelectProject={handleSelectProject}
          selectedProjectId={projectsState.selectedProjectId}
        />
        {content}
      </main>
    </>
  );
}

export default App;
