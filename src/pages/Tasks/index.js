import Button from "../../Components/UI/Button/Button";
import PageTitle from "../../Components/UI/PageTitle/PageTitle";
import style from "./Tasks.module.css";
import Modal from "../../Components/UI/Modal/Modal";
import { useContext, useState } from "react";
import TaskForm from "./components/TaskForm";
import TasksTable from "../Tasks/components/TasksTable/TasksTable";
import { useSelector } from "react-redux";

const Tasks = () => {

    const [ isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

    //const { tasksData } = useContext(TasksContext);
    //const tasksData = useSelector();          --> je récupère l'ensemble du state de Redux
    const tasksData = useSelector(state => state.tasks);  // --> je ne veux que les tasks (avec leurs états)

    return (
        <section className="container" style={{ position: 'relative' }}>
            <div className={ style['tasks-header'] }>
                <PageTitle count={ tasksData.count } title={ `Task${tasksData.count > 1 ? 's' : ''}` } />
                <Button onClick={ () => setIsNewTaskModalOpen(true) }>New Task</Button>
            </div>
            <TasksTable />
            <Modal isOpen={ isNewTaskModalOpen } setIsOpen={ setIsNewTaskModalOpen }>
                <TaskForm closeModal={ () => setIsNewTaskModalOpen(false) }/>
            </Modal>
        </section>
// 3 lignes au-dessus, closeModal est une Props qui va être utilisé ds le composant TaskForms
    );
};

export default Tasks;