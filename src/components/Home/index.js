import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.css';

export default function Home() {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [toDoData, setToDoData] = useState([]);

  useEffect(() => {
    getTodoList();
  }, []);

  const getTodoList = async () => {
    setLoading(true);
    await axios({
      method: 'get',
      url: `https://dummyjson.com/todos`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        setToDoData(res.data.todos);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const saveTask = async (e) => {
    const data = {
      completed: false,
      title: task,
      userId: 1,
    };

    await axios({
      method: 'post',
      url: `https://dummyjson.com/todos/add`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      data,
    })
      .then((res) => {
        setTask('');
        getTodoList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteTask = async (id) => {
    await axios({
      method: 'delete',
      url: `https://dummyjson.com/todos/${id}`,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((res) => {
        alert('Successfully deleted!');
        getTodoList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTask = async (id) => {
    const data = {
      completed: true,
    };

    await axios({
      method: 'patch',
      url: `https://dummyjson.com/todos/${id}`,
      data,
    })
      .then((res) => {
        alert('Successfully updated!');
        getTodoList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='todoPage'>
      <header>To-Do List</header>
      <div className='addTaskHere'>
        <p>Add a new task in the list</p>
        <div className='inputTask'>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='Enter the task here'
          />
          <button onClick={saveTask}>Submit</button>
        </div>
      </div>
      <div className='tasklist'>
        <p>Added task in to-do list</p>
        <div className='tasks'>
          {<h1>{loading && 'Fetching task..'}</h1>}
          {toDoData.map((_task) => {
            return (
              <div
                key={_task.id}
                className='taskCard'
                style={{
                  border: _task.completed && '1px solid #7ab530',
                  background: _task.completed && '#202020',
                }}
              >
                {_task.completed && (
                  <div className='completedStatus'>
                    <img src='tick.png' alt='tickCheck' />
                  </div>
                )}
                <div className='taskTitle'>
                  <p>{_task.todo}</p>
                </div>
                <hr></hr>
                <div className='updateTasks'>
                  <button
                    onClick={() => updateTask(_task.id)}
                    className='isCompleted'
                    style={{
                      backgroundColor: !_task.completed
                        ? '#c620a7'
                        : 'transparent',
                    }}
                  >
                    {_task.completed
                      ? 'Mark as Incompleted'
                      : 'Mark as Completed'}
                  </button>
                  <button
                    onClick={() => deleteTask(_task.id)}
                    className='deleteBtn'
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
