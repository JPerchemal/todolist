import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    tasks: [],
    count: 0,
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: INITIAL_STATE,
    reducers: {                     // Je crée mon Reducer
        addTask: (state, action) => {
            //state.tasks.push({ ...action.payload, createdAt: new Date(), isDone: false });   //payload va contenir la nouvelle valeur à insérer (envoyé à partir du composant)
            state.tasks.push({ ...action.payload, createdAt: Date.now(), isDone: false });     // Erreur dans la console. On remplace new Date() par Date.now() pour retourner un nombre et pas un objet date.
            state.count = state.tasks.length;
        },
        removeTask: (state, action) => {
            state.tasks.splice(+action.payload, 1);
            state.count = state.tasks.length;
        },
        editTask: (state, action) => {
            const editedTasks = state.tasks.map((task, index) => { // le.map retourne un nouveau tableau modifié à partir du tableau initial (tasks),
                if (index === action.payload.taskIndex) {          // mais sans modifier le tableau initial.
                    task = {...task, ...action.payload.task};      // On le met dans une constante pour pouvoir mettre à jour le state.
                }
                return task;
            });
            return {
                tasks: editedTasks,                                // MàJ du state des tasks (ça fonctionne un peu comme un reducer utilisé dans les contextes)
                count: editedTasks.length,
            }
        },
        toggleTaskIsDone: (state, action) => {
            const editedTasks = state.tasks.map((task, index) => {
                if (index === action.payload.taskIndex) {
                    task = { ...task, isDone: action.payload.isDone };
                }
                return task;
            });
            return {
                tasks: editedTasks,
                count: editedTasks.length,
            }
        },
    },
});

export const { addTask, removeTask, editTask, toggleTaskIsDone } = tasksSlice.actions;

export default tasksSlice.reducer;