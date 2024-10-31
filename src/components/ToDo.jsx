import { useEffect, useState } from "react";
import "./CSS/ToDo.css";
import ToDoItems from "./ToDoItems.jsx";
import { useRef } from "react";

let count = 0;
const ToDo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
    localStorage.setItem("todos_count", count);
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  }, []);

  useEffect(() => {
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="todo">
      <div className="todo-header">To Do</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="todo-input"
        ></input>
        <div
          onClick={() => {
            add();
          }}
          className="todo-add-btn"
        >
          Add
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <ToDoItems
              key={index}
              setTodos={setTodos}
              no={item.no}
              display={item.display}
              text={item.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ToDo;
