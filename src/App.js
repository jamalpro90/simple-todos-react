/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './App.scss';
import { db } from './config/firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { XIcon, CheckIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState('');
  const [selectedTodo, setSelectedTodo] = useState({});
  const [inputBtn, setInputBtn] = useState('Add');
  const todosCollectionRef = collection(db, 'todos');

  useEffect(() => {
    const getTodos = async () => {
      const data = await getDocs(todosCollectionRef);
      setTodos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(todos);
    };

    getTodos();
  }, []);

  const addTodo = async () => {
    // jika tambah todo
    if (inputBtn === 'Add') {
      try {
        const newTodo = await addDoc(todosCollectionRef, { todo: inputTodo, completed: false });
        console.log(newTodo.id);
        setInputTodo('');
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    } else {
      // jika ubah todo
      try {
        const docRef = doc(db, 'todos', selectedTodo.id);
        const newUpdateDoc = await updateDoc(docRef, { todo: inputTodo });
        console.log(newUpdateDoc);
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
      // setInputTodo('');
      // setInputBtn('Add');
    }
  };

  const updateTodo = async (todo) => {
    setInputBtn('Update');
    setInputTodo(todo.todo);
    setSelectedTodo(todo);
  };

  const deleteTodo = async (todo) => {
    try {
      const docRef = doc(db, 'todos', todo.id);
      await deleteDoc(docRef);
      // console.log('success delete todo : ', newDeleteDoc);
      console.log(todo);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const completeList = async (e, todo) => {
    // const targetP = e.target.parentNode.parentNode.parentNode.childNodes[0];
    // const targetSpan = e.target.parentNode.parentNode.childNodes[0];
    // if (targetP.classList.contains('text')) {
    //   targetP.classList.toggle('text-line');
    //   console.log(targetSpan);
    // }
    // setIsCheck(!isCheck);
    // console.log(isCheck);
    try {
      const docRef = doc(db, 'todos', todo.id);
      // eslint-disable-next-line no-unused-vars
      const newUpdateDoc = await updateDoc(docRef, { completed: !todo.completed });
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="app">
      {/* Input Box */}
      <div className="input-box">
        <input value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} type="text" placeholder="What would you do..." />
        <button onClick={addTodo}>{inputBtn}</button>
      </div>
      {/* Todos */}
      <div className="todos">
        {todos.map((todo) => (
          <div key={todo.id} className="todo">
            <p className={`text ${todo.completed && 'text-line'}`}>{todo.todo}</p>
            <div className="button-container">
              <span onClick={(e) => completeList(e, todo)}>{todo.completed ? <CheckIcon className="icon-todo check-x" /> : <XIcon className="icon-todo check-x" />}</span>
              <span onClick={() => updateTodo(todo)}>
                <PencilIcon className="icon-todo pencil" />
              </span>
              <span onClick={() => deleteTodo(todo)}>
                <TrashIcon className="icon-todo trash" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
