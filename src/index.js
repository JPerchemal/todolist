import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import TasksContextProvider from './Contexts/TasksContext';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={ store }>      {/* une props store avec la valeur store*/}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

/*
Avant d'utiliser Redux (avec un Provider):

root.render(
  <React.StrictMode>
    <TasksContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TasksContextProvider>
  </React.StrictMode>
);
*/