import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TodoItem from "../components/layout/TodoItem";

interface TodoProps {
  user: any;
}

const Todos = (props: TodoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = React.useState<any[]>([]);
  const [todo, setTodo] = useState({
    id: "",
    content: "",
    checked: false,
    authorEmail: "",
  });

  // form validation rules
  const validationSchema = Yup.object().shape({
    task: Yup.string().max(30, "A task cannot be more than 30 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setValue, reset, formState } =
    useForm(formOptions);
  const { errors } = formState;

  const touchDirtyValidate = {
    shouldTouch: true,
    shouldDirty: true,
    shouldValidate: true,
  };

  // change and submit handler for addtodo input form
  const handleOnChange = (c: any) => {
    setValue(c.target.name, c.target.value, touchDirtyValidate);
    setTodo({ ...todo, content: c.target.value });
  };

  const handleOnSubmit = (e: any) => {
    //const id = uuid();
    const authorEmail = props.user.email;
    if (todo.content.trim()) {
      // function to add item to the server/database:
      addTodoToServer({ ...todo, authorEmail });

      // add item to the state:
      setTodos([todo, ...todos]);
      // sets the form text back to empty, after the item was added to the "items" state via the "addItem" callback function:
      setTodo({ ...todo, content: "" });
      setValue("task", "");
    }
  };

  // fetch all todos from server everytime the todo state changes
  useEffect(() => {
    todo.content === "" && setIsLoading(true);
    fetch(
      `https://shortlist-backend.herokuapp.com/tasks/author/${props.user.email}`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + props.user.accessToken,
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
        setIsLoading(false);
      });
  }, [todo]);

  // add todo to the server
  const addTodoToServer = (todo: any) => {
    fetch("https://shortlist-backend.herokuapp.com/task/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  // callback function to remove todo from the todos state:
  const removeTodo = (id: any) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // callback function to toggle todo at the todos state:
  const toggleTodo = (id: String) => {
    setTodos(
      todos.map((todo: { id: String; checked: any }) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  return (
    <div className="todos">
      <div className="flex-column">
        <div className="flex-column">
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <input
              {...register("task")}
              className="input mr-medium"
              type="text"
              name="task"
              id="task"
              placeholder="Add a task"
              onChange={(c) => handleOnChange(c)}
            />
            <button type="submit" disabled={todo.content === "" || errors.task}>
              Add
            </button>
          </form>
          <span>{errors.task?.message}</span>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
              />
            ))}
          </ul>
        )}
      </div>
      <br />
    </div>
  );
};

export default Todos;
