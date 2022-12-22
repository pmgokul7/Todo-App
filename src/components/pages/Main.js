import React, { useEffect, useRef, useState } from "react";
import "./main.css";
function Main() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const inputRef = useRef(null);
  const [idea, setIdea] = useState("");
  useEffect(() => {
    inputRef.current.focus();
  }, [todos]);
  function addTodo(e) {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        {
          todo: todo,
          status: false,
          id: Date.now(),
          time: new Date().toLocaleString(),
          edit: false,
        },
        ...todos,
      ]);
      setTodo("");
    }
  }
  function deteleTodo(index) {
    console.log(index);
    var array = todos;
    array.splice(index, 1);
    setTodos([...array]);
  }
  function showEdit(id) {
    setTodos(
      todos.filter((obj) => {
        if (id === obj.id) {
          obj.edit = true;
        }

        return obj;
      })
    );
  }
  function changeTodo(id) {
    todos.filter((obj) => {
      if (id == obj.id) {
          console.log("else");
          obj.todo = editTodo;
          obj.time = new Date().toLocaleString();
          obj.edit = false;
      }

      setIdea(todos);
      return obj;
    });
  }

  return (
    <section style={{ display: "flex" }}>
      <section className="main_container">
        <section className="left_section">
          <h1>My To-Do List</h1>
          <form action="" onSubmit={(e) => addTodo(e)}>
            <input
              maxLength="40"
              autoComplete="off"
              ref={inputRef}
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              type="text"
              id="textbox"
              placeholder="New item..."
            />
          </form>
          <ul id="lit">
            {todos.map((t, index) => (
              <li className="lists">
                <input
                  onChange={(e) => {
                    console.log(e.target.value);
                    setTodos(
                      todos.filter((obj) => {
                        if (obj.id === t.id) {
                          obj.status = e.target.checked;
                        }
                        return obj;
                      })
                    );
                  }}
                  type="checkbox"
                  name="check"
                  checked={t.status}
                  value={t.status}
                  id=""
                />
                <section className="todo">
                  <>
                    {t.edit === false ? (
                      t.todo
                    ) : (
                      <>
                        <input
                          onChange={(e) => setEditTodo(e.target.value)}
                          type="text"
                          className="editInput"
                          defaultValue={t.todo}
                          placeholder="editTod"
                        />
                      </>
                    )}
                    <br />
                    <span style={{ fontSize: "12px" }}> {t.time}</span>
                  </>
                </section>
                <section className="sec">
                  {t.edit === false ? (
                    <button
                      class="listdone"
                      id="listd"
                      style={{
                        backgroundColor: "yellow",
                        color: "#000",
                        width: "25px",
                        height: "25px",
                      }}
                      onClick={() => showEdit(t.id)}
                    >
                      {" "}
                      <i class="fa-solid fa-pen "></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => changeTodo(t.id)}
                      style={{
                        backgroundColor: "green",
                        width: "25px",
                        height: "25px",
                        color: "white",
                      }}
                    >
                      <i class="fa-solid fa-check"></i>
                    </button>
                  )}

                  <button
                    class="listdone"
                    id="listd"
                    onClick={() => deteleTodo(index)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </section>
              </li>
            ))}

            {todos.length > 0 ? (
              <section
                className="clear_btn"
                onClick={() => {
                  setTodos([]);
                }}
              >
                {" "}
                clear all
              </section>
            ) : null}
          </ul>
        </section>
      </section>
      <section
        className="right"
        style={{
          visibility:
            todos.length > 0 &&
            todos.filter((arr) => {
              if (arr.status) {
                return arr.status;
              }
              return null;
            }).length > 0
              ? "visible"
              : "hidden",
        }}
      >
        <h3>completed tasks</h3>
        <br />
        {todos.map((obj) => {
          if (obj.status) {
            return (
              <>
                <span className="completed-list">{obj.todo}</span>
                <br />
                <hr />
              </>
            );
          }
          return null;
        })}
      </section>
    </section>
  );
}

export default Main;
