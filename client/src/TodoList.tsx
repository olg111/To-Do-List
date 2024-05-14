import React, { useState } from 'react';

interface IProps {
    id: number;
    text: string;
    completed: boolean;
}


export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<IProps[]> ([
    {id: 1, text: "Task 1", completed: false},
    {id: 2, text: "Task 2", completed: false},
    {id: 3, text: "Task 3", completed: false},
  ]);
  const [input, setInput] = useState<string>("");

  const handleToggle = (id: number) => {
    setTodos(
        todos.map((todo) => {
            if (todo.id === id){
                return {...todo, completed: !todo.completed};
            }
            return todo
        })
    );
  };

  const handleClick = () => {
    const newTodo: IProps = {id: Date.now(), text: input, completed: false};
    setTodos([...todos, newTodo]);
  }

  return (
    <div className='main-container'>
        <h1>To do List</h1>
        <ul>
            {todos.map((todo) => (
                <li 
                    key={todo.id} 
                    onClick={() => handleToggle(todo.id)}
                    style={{textDecoration: todo.completed ? "line-througt" : "none"}}
                >    
                    {todo.text}   
        
                </li>
            ))}
        </ul>
        <input 
            type='text' 
            placeholder='Add todo item' 
            onChange={(e) => setInput(e.currentTarget.value)}
        />
        <button 
            onClick={handleClick}> 
            Add 
        </button>
    </div>

  ) 
  
}
