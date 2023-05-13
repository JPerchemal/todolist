import { useContext, useState } from "react";
import { TasksContext } from "../../../../Contexts/TasksContext";
import Button from "../../../../Components/UI/Button/Button";
import Modal from "../../../../Components/UI/Modal/Modal";
import TaskForm from "../TaskForm";
import TaskTimer from "../TaskTimer/TaskTimer";
import useTimeParser from "../../../../Hooks/useTimeParser";
import { removeTask, toggleTaskIsDone } from "../../../../store/TasksSlice";
import { useDispatch } from "react-redux";

const TaskRow = ({ task, index }) => {

    const [ IsEditTaskModalOpen, setIsEditTaskModalOpen ] = useState(false);
    const [ IsTimerModalOpen, setIsTimerModalOpen ] = useState(false);

    // const { removeTask, toggleTaskIsDone } = useContext(TasksContext);
    const dispatch = useDispatch();     // gestion des tâches avec Redux

    // Pour avoir le temps dans le bon format (voir le hook useTimeParser)
    const { parseSecondsToHMS } = useTimeParser();

    const handleDeleteTask = () => {
        dispatch(removeTask(index));
    };

    const handleChangeStatus = (event) => {
        const value = event.target.checked;
        dispatch(toggleTaskIsDone({ taskIndex: index, isDone: value }));
    };

    //On a remplacé new Date() par Date.now() dans TasksSlice
    //donc on modifie la ligne 46 { task.createdAt.toLocaleDateString() } par { new Date(task.createdAt).toLocaleDateString() }
    return (
        <>
            <tr>
                <td>
                    <input type="checkbox" checked={ task.isDone } onChange={ handleChangeStatus }/>
                </td>
                <td>
                    { task.title }
                </td>
                <td>
                    { task.description }
                </td>
                <td>
                    { new Date(task.createdAt).toLocaleDateString() }
                </td>
                <td>
                    { task.time && parseSecondsToHMS(task.time) }
                </td>
                <td style={{ display: 'flex', gap: 4, justifyContent: 'end' }}>
                    <Button onClick={ () => setIsTimerModalOpen(true)  }>Launch Timer</Button>
                    <Button variant="danger" onClick={ handleDeleteTask }>Delete</Button>
                    <Button onClick={ () => setIsEditTaskModalOpen(true) }>Edit</Button>
                </td>
            </tr>
            <Modal isOpen={ IsEditTaskModalOpen } setIsOpen={ setIsEditTaskModalOpen } title={ task.title }>
                <TaskForm closeModal={ () => setIsEditTaskModalOpen(false) } value={{ title: task.title, description: task.description }} index={ index }/>
            </Modal>
            <Modal isOpen={ IsTimerModalOpen } setIsOpen={ setIsTimerModalOpen } title={ task.title }>
                <TaskTimer index={ index } onCloseModal={ () => setIsTimerModalOpen(false) }/>
            </Modal>
        </>

    )

};

export default TaskRow;