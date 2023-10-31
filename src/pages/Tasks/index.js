import Button from "../../Components/UI/Button/Button";
import PageTitle from "../../Components/UI/PageTitle/PageTitle";
import style from "./Tasks.module.css";
import Modal from "../../Components/UI/Modal/Modal";
import { useContext, useState } from "react";
import TaskForm from "./components/TaskForm";
import TasksTable from "../Tasks/components/TasksTable/TasksTable";
import { useSelector } from "react-redux";

const Tasks = () => {

    const [ isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false); // par défaut la modal est fermée

    // Avec le contexte
    //const { tasksData } = useContext(TasksContext);       --> ça c'était avant d'utiliser Redux

    // Avec Redux (state management):
    //const tasksData = useSelector();                      --> si je fais ça je récupère l'ensemble du state de Redux
    const tasksData = useSelector(state => state.tasks);  // --> je ne veux que les tasks (avec leurs états)

    return (
        <section className="container" style={{ position: 'relative' }}>
            <div className={ style['tasks-header'] }>
                <PageTitle count={ tasksData.count } title={ `Task${tasksData.count > 1 ? 's' : ''}` } />
                <Button onClick={ () => setIsNewTaskModalOpen(true) }>New Task</Button> {/* Au clique sur le Button on ouvre la modal*/}
            </div>
            <TasksTable />
            <Modal isOpen={ isNewTaskModalOpen } setIsOpen={ setIsNewTaskModalOpen }> {/* ne pas oublier isOpen{isNewTaskModalOpen} et setIsOpen{setIsNewTaskModalOpen} pour contrôler le state de la modal */}
                <TaskForm closeModal={ () => setIsNewTaskModalOpen(false) }/> {/* Au clique sur le Button "save" on ferme la modal */}
            </Modal>
        </section>
// 3 lignes au-dessus, closeModal est une Props qui va être utilisé ds le composant TaskForms
    );
};

export default Tasks;
