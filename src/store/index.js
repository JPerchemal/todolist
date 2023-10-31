import { configureStore } from "@reduxjs/toolkit";  // Pour configurer le store
import tasksReducer from './TasksSlice';            // j'importe mon reducer(TasksSlice) avec tasksReducer

const store = configureStore({      // Objet en argument,
    reducer: {                      // avec des reducer qui vont être enregistrés
        tasks: tasksReducer,        // un reducer pour nos tasks
    },
});

/*
Je viens d'enregistrer mon reducer au près de Redux. Donc Redux connait mon reducer,
il l'a ajouté à mon état global (il a ajouté le state de mon reducer au state global de redux).
ce qui permet de l'utilliser partout dans mon application
*/

export default store;