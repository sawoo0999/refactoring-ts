import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

// "root" 요소가 null이 아닐 것을 TypeScript에게 명시
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<App />); // <App />는 렌더링할 React 컴포넌트
