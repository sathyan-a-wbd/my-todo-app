import { useState } from "react";
import "./App.css";
import Nav from "./component/NavBar";
import Todo from "./component/Todo";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <Nav />
      <Todo />
    </>
  );
}

export default App;
