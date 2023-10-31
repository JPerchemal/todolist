import { createSlice } from "@reduxjs/toolkit";     // j'importe createSlice

const INITIAL_STATE = {                             // je crée une Constante INITIAL_STATE (comme ds le context)
    tasks: [],
    count: 0,
};

const tasksSlice = createSlice({                    // je crée une constante tasksSlice qui prends en argument un objet
    name: 'tasks',                                  // je nomme mon slice
    initialState: INITIAL_STATE,                    // je défini un état initial
    reducers: {                                     // Je crée mon Reducer
        addTask: (state, action) => {               // On récupére l'état actuel du state et l'action
            // Contrairement au context pas besoin de créé un copie de tasks. Avec Redux on a le droit de modifier directement le state.
            //state.tasks.push({ ...action.payload, createdAt: new Date(), isDone: false });   //payload va contenir la nouvelle valeur à insérer (envoyé à partir du composant)
            state.tasks.push({ ...action.payload, createdAt: Date.now(), isDone: false });     // Erreur dans la console. On remplace new Date() par Date.now() pour retourner un nombre et pas un objet date.
            state.count = state.tasks.length;
        },
        removeTask: (state, action) => {
            state.tasks.splice(+action.payload, 1); // action.payload va contenir l'index. le + pour être sûr de convertir l'index en nombre. Et je supprime qu'1 seule task.
            state.count = state.tasks.length;       // je mets à jour le nbre de tasks enregistrées
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
                    task = { ...task, isDone: action.payload.isDone }; // Je décompose la tâche avec le spreaOperator et je modifie isDone
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

/* j'exporte les actions, via une constante, pour les utliser dans les autres composants.
Redux configure automatiquement le type d'action
Pas besoin de faire le dispatch avec le type d'action comme dans le context (TasksContext.js)*/
export const { addTask, removeTask, editTask, toggleTaskIsDone } = tasksSlice.actions;

export default tasksSlice.reducer;      // tasksSlice embarque le reducer (grace à createSlice voir notice de redux)