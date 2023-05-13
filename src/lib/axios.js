
// import axios from "axios";  --> je ne fais pas ça car je veux créer ma propre instance axios (une constance) à partir d'Axios.
// Avec ma propre configuration.

import { default as Axios } from "axios";

const axios = Axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 10000,
    headers: {
        // 'CSRF-Token': csrfToken
    }
});

// Ensuite on peut appeler des fonctionnalités comme par exemple une, qui envoie une requete avec la méthode GET à partir de axios.
const sendGetRequest = (url, params = {}, headers = {}) => {
    return axios.get(url, {
        headers,
        params,
    });
};

// Et j'utiliserais cette constante dans un autre fichier (ici authentification).

export { sendGetRequest };