import React from "react";
import './home.css'
import { useState } from 'react';
import Modal from './modal';


export default function Home(){
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editTaskIndex, setEditTaskIndex] = useState(null);
    const [searchInput, setSearchInput] = useState("");


    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    
      const addTask = (task, index) => {
        const newTask = {
          text: task,
          color: generateRandomColor(),
        };

        if (index !== undefined) {
            const updatedTasks = [...tasks];
            updatedTasks[index] = newTask;
            setTasks(updatedTasks);
          } else {
            setTasks([...tasks, newTask]);
          }
        
          setShowModal(false);
       
      };

      const deleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
      };
      

      const filteredTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(searchInput.toLowerCase())
      );

    return (
        <>
        <div className="Home d-flex justify-content-center flex-column">
            <h1 className="mb-5">Do it Now</h1>
            <div className="d-flex">
            <input className="searchBar rounded mr-2" type="text" value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} placeholder="What's the task" />
            <button className="addButton rounded" onClick={() => setShowModal(true)}>
                Add
            </button>

            {showModal && (
                <Modal onClose={() => setShowModal(false)} onAddTask={addTask} />
            )}
            
            </div>

            {filteredTasks.map((task, index) => (
                <div className="card rounded w-50" key={index} style={{ backgroundColor: task.color }}>
                    <div className="card-body d-flex justify-content-between">
                            <p className="m-0 card-text">{task.text}</p>
                        <div className="">
                            <svg className="mr-3" onClick={() => {
                                setEditTaskIndex(index);
                                setShowEditModal(true);
                            }} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 36 36"><path fill="currentColor" d="M33.87 8.32L28 2.42a2.07 2.07 0 0 0-2.92 0L4.27 23.2l-1.9 8.2a2.06 2.06 0 0 0 2 2.5a2.14 2.14 0 0 0 .43 0l8.29-1.9l20.78-20.76a2.07 2.07 0 0 0 0-2.92M12.09 30.2l-7.77 1.63l1.77-7.62L21.66 8.7l6 6ZM29 13.25l-6-6l3.48-3.46l5.9 6Z" className="clr-i-outline clr-i-outline-path-1"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>
                            {showEditModal && editTaskIndex === index && (
                              <Modal
                                onClose={() => {
                                  setShowEditModal(false);
                                  setEditTaskIndex(null);
                                }}
                                onAddTask={(taskText) => addTask(taskText, editTaskIndex)}
                                initialText={tasks[editTaskIndex].text}
                                index={editTaskIndex}
                                isEditMode={true} // Pass isEditMode to the modal
                              />
                            )}

                            <svg  onClick={() => deleteTask(index)} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M5 3h2a1 1 0 0 0-2 0M4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.441l-.443 5.17A2 2 0 0 1 7.623 11H4.377a2 2 0 0 1-1.993-1.83L1.941 4H1.5a.5.5 0 0 1 0-1zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0zM5 5.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M3.38 9.085a1 1 0 0 0 .997.915h3.246a1 1 0 0 0 .996-.915L9.055 4h-6.11z"></path></svg>
                        </div>
                    </div>
                </div>
             ))}
        </div>
        </>
        )
        
    }
    