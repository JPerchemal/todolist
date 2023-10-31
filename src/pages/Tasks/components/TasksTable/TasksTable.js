// import { useContext } from 'react';
import { useSelector } from 'react-redux';
// import { TasksContext } from '../../../Contexts/TasksContext';
import TaskRow from './TaskRow';
import style from './TasksTable.module.css';

const TasksTable = () => {

//  Avec le context :    
//  const { tasksData } = useContext(TasksContext);

//  Avec redux :
    const tasksData = useSelector(state => state.tasks); 

    return (
        <div className={ style['tasks-table-container']}>
            <table className={ style['tasks-table']}>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created at</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasksData && tasksData.tasks && tasksData.tasks.map((task, index) => (
                            //<TaskRow key={ Date.parse(task.createdAt) - index } task={ task } index={ index }/>
                            /*On a remplacé new Date() par Date.now() (qui retourne un nbre) dans TasksSlice
                            donc on n'a plus besoin du Date.parse() qui transfomait la date en nbre*/
                            <TaskRow key={ task.createdAt - index } task={ task } index={ index }/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TasksTable;