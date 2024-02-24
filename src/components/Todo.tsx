import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

const Todo = () => {
  const [todos, setTodos] = useState([]);

  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, "todos"));
      const querySnapshot = await getDocs(q);

      const initialTodos = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        console.log(doc);
        initialTodos.push({ id: doc.id, ...doc.data() });
      });

      setTodos(initialTodos);
    };

    fetchData();
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "text") {
      setText(value);
    }
  };

  const addTodo = async (event) => {
    event.preventDefault();
    const newTodo = { text: text, isDone: false };

    const collectionRef = collection(db, "todos");
    const { id } = await addDoc(collectionRef, newTodo);

    setTodos((prev) => {
      return [...todos, { ...newTodo, id }];
    });
    setText("");
  };
  console.log(todos);
  return (
    <div>
      <h2>할 일 컴포넌트</h2>
      <form>
        <div>
          <label>할 일 : </label>
          <input
            type="text"
            value={text}
            name="text"
            onChange={onChange}
            required
          ></input>
          <button onClick={addTodo}>추가</button>
        </div>
      </form>
      <h3>Working</h3>
      {todos
        .filter((todo) => !todo.isDone)
        .map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todos={todos}
              todo={todo}
              setTodos={setTodos}
            />
          );
        })}
      <h3>Done</h3>
      {todos
        .filter((todo) => todo.isDone)
        .map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todos={todos}
              todo={todo}
              setTodos={setTodos}
            />
          );
        })}
    </div>
  );
};

export default Todo;
