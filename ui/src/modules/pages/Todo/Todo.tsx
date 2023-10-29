import React, { useState } from 'react';
// import Select, { OptionProps, components } from 'react-select';
import { TodoResponse } from '../../../types/api';

const Todo: React.FC = () => {
    const todos: TodoResponse[] = [
        { id: 1, name: 'Task 1', isCompleted: false },
        { id: 2, name: 'Task 2', isCompleted: false },
        { id: 3, name: 'Task 3', isCompleted: true }
    ];
    const [taskName, setTaskName] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='todo-content'>
            <div className='top-layout'>
                <div className='todo-container'>
                    <h1 className='todo-header-text'>T O D O</h1>
                    <input value={taskName} onChange={(e) => setTaskName(e.target.value)} className='todo-selector' />
                </div>
            </div>
            <div className={`bottom-layout ${isMenuOpen && 'b-gray'}`} >
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                {isMenuOpen ? 'Drag and drop to reorder list' : ''}
            </div>
        </div>
    );
};

export default Todo;