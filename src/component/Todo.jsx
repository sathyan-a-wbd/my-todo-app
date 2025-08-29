import React, { useEffect, useReducer, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";
import { FcTodoList } from "react-icons/fc";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineSaveAs } from "react-icons/md";

const initialState = {
  todo: [],
  filter: "all",
  editId: null,
};
function init(initialState) {
  const storedData = localStorage.getItem("todo");
  return storedData ? JSON.parse(storedData) : initialState;
}
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        todo: [
          ...state.todo,
          { id: Date.now(), text: action.text, completed: false },
        ],
      };
    case "delete":
      return {
        ...state,
        todo: state.todo.filter((item) => item.id !== action.id),
      };
    case "toggle":
      return {
        ...state,
        todo: state.todo.map((item) =>
          item.id === action.id ? { ...item, completed: !item.completed } : item
        ),
      };
      break;
    case "filter":
      return {
        ...state,
        filter: action.filter,
      };
    case "Set_Edit":
      return {
        ...state,
        editId: action.id,
      };
    case "update":
      return {
        ...state,
        todo: state.todo.map((item) =>
          item.id === state.editId ? { ...item, text: action.text } : item
        ),
        editId: null, // reset edit mode after update
      };
    default:
      break;
  }
}
function Todo() {
  let [haveTodo, setHaveTodo] = useState(false);
  let [state, dispatch] = useReducer(reducer, initialState, init);
  let [userInput, setUserInput] = useState("");

  let filterData = state.todo.filter((item) => {
    if (state.filter === "completed") return item.completed;
    if (state.filter === "pending") return !item.completed;
    return true;
  });
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(state));
  }, [{ state }]);
  let handleChange = (e) => {
    dispatch({ type: "filter", filter: e.target.value });
  };
  let handleAddOrUpdate = () => {
    if (!userInput.trim()) return;

    if (state.editId) {
      // update existing todo
      dispatch({ type: "update", text: userInput });
    } else {
      // add new todo
      dispatch({ type: "add", text: userInput, completed: false });
    }

    setUserInput(""); // clear input
  };
  let handleEdit = (id) => {
    let currentTodo = state.todo.find((t) => t.id === id);
    setUserInput(currentTodo.text); // set text in input box
    dispatch({ type: "Set_Edit", id });
  };
  return (
    <div className="todo ">
      <div className="todo-container">
        <h3>Todo List</h3>

        <div className="input-field">
          <input
            type="text"
            value={userInput}
            placeholder="Enter todo"
            onChange={(e) => setUserInput(e.target.value)}
          />
          {state.editId ? (
            <MdOutlineSaveAs
              role="button"
              onClick={handleAddOrUpdate}
              title={state.editId ? "Update Todo" : "Add Todo"}
            />
          ) : (
            <IoAddSharp
              size={25}
              role="button"
              onClick={handleAddOrUpdate}
              title={state.editId ? "Update Todo" : "Add Todo"}
            />
          )}
        </div>

        <div className="select-container">
          <select onChange={handleChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <ul className="ul">
          {!filterData ? (
            <h4>Add Some Todo's</h4>
          ) : (
            filterData.map((item) => {
              return (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => dispatch({ type: "toggle", id: item.id })}
                  />
                  <label>{item.text}</label>
                  <MdOutlineModeEdit
                    role="button"
                    size={20}
                    onClick={() => handleEdit(item.id)}
                  />
                  <MdDeleteSweep
                    className="delete"
                    role="button"
                    onClick={() => dispatch({ type: "delete", id: item.id })}
                  />
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
