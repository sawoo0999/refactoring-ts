import { useState } from "react";
import logo from "../assets/no-projects.png";
import Button from "./Button";
import { NoProjectSelectedProps } from "../types/type";

export default function NoProjectSelected({
  onStartAddProject,
}: NoProjectSelectedProps) {
  //받은 props onClick 메서드로 함수 실행
  return (
    <div className="mt-24 text-center w-2/3">
      <img
        src={logo}
        alt="no-projects"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-700 my-4">
        No Project Selected
      </h2>
      <p className="text-stone-600 mb-4">
        Select a project or get started with a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStartAddProject}>Create new Project</Button>
      </p>
    </div>
  );
}
