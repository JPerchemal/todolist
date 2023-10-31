/* //! PLUS BESOIN DE TasksContext CAR J'UTILISE LE REDUX AVEC UN STORE (voir tasksSlice.js)

import { createContext, useReducer } from "react";

const TasksContext = createContext({                    // Je crée le context
    tasksData : {                                       // Un objet :
        tasks: [],                                      // Avec une tableau des tasks (vide au début)
        count: 0,                                       // et un compteur à 0 (au début)
    },
    addTask : (task) => {},                             // Méthode/fct addTask avec en argument/paramétre 1 task
    removeTask: (taskIndex) => {},                      // removeTask prend l'index de la task
    toggleTaskIsDone: ({ taskIndex, isDone }) => {},    // toggleTaskIsDone prend l'index de la task et isDone (booléen)
    editTask: ({ taskIndex, task }) => {},              // editTask prend l'index le la task à modifier et les données le la task
});

export { TasksContext };                                // Ne pas oublier d'exporter le context

const INITIAL_TASKS = {     // const INITIAL_TASKS contient les valeurs par défaut de l'état du reducer
    tasks: [],              // un tableau vide
    count: 0,               // et count à 0
};

const tasksReducer = (state, action) => {               // Un reducer prend 2 arguments le state et les actions
    if (action.type === 'ADD_TASK' && action.value) {   // action.value = dispatchTasks({ type: 'ADD_TASK' , value: task }); du provider
                                                        // donc si le type d'action c'est ADD_TASK et que j'ai une valeur
        const tasks = [...state.tasks, action.value];   // Copie de tasks et ajout de la nouvelle task (action.value)
        return {
            tasks,                                      // Je retourne le nouvel état du state (les tasks + la nouvelles task)
            count: tasks.length,                        // et je mets le compteur à jour
        };
    }

    if (action.type === 'REMOVE_TASK' && !isNaN(+action.value)) {  // ! isNaN(+action.value) => est un nombre. Le + pour s'assurer value est bien converti
        const tasks = [...state.tasks];     // On fait une "copie" du tableau pour pouvoir faire le splice après avec le nouveau tableau
        tasks.splice(+action.value, 1);     // On supprime l'élément qui correspond à action.value, 1 seul élément
        return {                            // On retourne le nouvel état
            tasks,                          // avec les taches moins 1 élément
            count: tasks.length,            // et on met à jour le compteur
        };
    }

	if (action.type === 'EDIT_TASK' && action.value && !isNaN(+action.value.taskIndex)) { // On doit avoir l'index pour faire une modif
		const tasks = [...state.tasks];         // Copie de tasks
		tasks[+action.value.taskIndex] = {      // = action.value.task  --> je ne fais pas ça sinon je vais écraser les autres valeurs de la tâche comme status, createdAt, time...
			...tasks[+action.value.taskIndex],  // donc je fais un spreadOperator pour ne récupérer que les value à l'index de la tâche
            ...action.value.task,               // (equivaut à title:action.value.task.title et description:action.value.task.description) pour compléter avec les nouvelles valeurs à enregistrer
        };
        return {
            tasks,                  // je retourne les tâches
            count: tasks.length,    // et même si le nbre de tâches n'a pas changé, je mets à jour le compteur (pour être sûr :))
        };
    }

	if (action.type === 'TOGGLE_STATUS' && action.value && !isNaN(+action.value.taskIndex)) {
		const tasks = [...state.tasks];         // Copie de tasks
		tasks[+action.value.taskIndex] = {      // Je récupère la tâche dont l'id est égale action.value.taskIndex
			...tasks[+action.value.taskIndex],  // Je récupère toutes les valeurs de la tâche qui a l'Id taskIndex
			isDone: action.value.isDone,        // Je veux seulement modifier isDone avec la nouvelle valeur action.value.isDone (passer dans le payload)
		};
		return {
			tasks,                              // Je retourne le nouvel état du state (Les taches mis à jour)
			count: tasks.length,                // Le nouveau compte (même si il n'a pas changé)
		};
	}

    return state ? state : INITIAL_TASKS;   // on retourne le state si le state existe sinon on retroune INITIAL_TASK
}

const TasksContextProvider = ({ children }) => {

    const [tasksData, dispatchTasks] = useReducer(tasksReducer, INITIAL_TASKS); // Dispatch permet de diffuser les info màj à ts les composants qui utilisent le contexte

    const addTask = (task) => {                             // prend comme argument la task à ajouter
        dispatchTasks({ type: 'ADD_TASK' , value: task });  // je dispatch avec le type d'action ici ADD_TASK (pour le reducer on définit l'action avec une chaine de caractère 'string'), et la valeur de task
    };

    const removeTask = (taskIndex) => {
        dispatchTasks({ type: 'REMOVE_TASK', value: taskIndex});
    };

	const editTask = ({ taskIndex, task }) => {
		dispatchTasks({ type: 'EDIT_TASK', value: { taskIndex, task } });
	};

	const toggleTaskIsDone = ({ taskIndex, isDone }) => {
		dispatchTasks({ type: 'TOGGLE_STATUS', value: { taskIndex, isDone } });
	};

    const value = {             // On exporte les value pour pouvoir les récupérer de n'importe quel composant
        tasksData,
        addTask,
        removeTask,
        editTask,
		toggleTaskIsDone,
    };

    return (
        <TasksContext.Provider value={ value }>
            { children }
        </TasksContext.Provider>
    )
};

export default TasksContextProvider;

*/