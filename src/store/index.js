import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './TasksSlice';

const store = configureStore({
    reducer: {
        tasks: tasksReducer,        // Je viens d'enregistrer mon reducer au près de Redux
    },
});

export default store;