import axios from "axios";
import { useEffect } from "react";

const Api = () => {

    // On utilise jsonplaceholder pour tester nos requêtes API (https://jsonplaceholder.typicode.com/guide/).
    // Dans la console (avec le console.log) on verra de fausses données qui nous seront renvoyées.
    // On utilise AXIOS (voir en bas du ficher pour la méthode avec FETCH)

    useEffect(() => {

        axios.get('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
            console.log(response.data);
        })
        .catch(console.error);

    }, []);

    return (
        <div>
            <h1>Welcome on Api Page !</h1>
            <p>J'utilise jsonplaceholder pour tester mes requêtes API (https://jsonplaceholder.typicode.com/guide/).</p>
        </div>
    )
};

export default Api;

// En plus de Fetch et Axios, il existe une autre librairie très complête qui s'appelle React Query (A TESTER)

/*
CI- DESSOUS METHODE AVEC FETCH:

import { useEffect } from "react";

const Api = () => {

    // On utilise jsonplaceholder pour tester nos requêtes API (https://jsonplaceholder.typicode.com/guide/).
    // Dans la console (avec le console.log) on verra de fausses données qui nous seront renvoyées.
    // on va utiliser fetch car c'est une fonctionnalité native du naviguateur.

    useEffect(() => {
        // Par défaut les requêtes sont faîtes avec la méthode GET donc pas besoin de le préciser.
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'GET',
            headers: {},
            // body: JSON.stringify({}), --> pour avoir un objet ou un tableau, dans le cas de requêtes POST PUT ou PATCH
        })
        // fetch retourne une promesse donc on peut faire un .then et récupérer la réponse
        // Cette réponse est un objet
        .then(response => {
            // dans cet objet j'ai un booléen qui s'appelle "ok"
            if(!response.ok) { // si pas ok j'envoi une error
                throw new Error(`HTTP Error: ${response.status}`);
            }
            // si pas d'erreur je renvoi une réponse qui va aussi être une promesse qui me permet de récupérer aussi le body de la réponse
            return response.json();

        })
        .then(json => console.log(json));

        // exemple avec une méthode POST
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => console.log(json));

    }, []);

    return (
        <div>
            <h1>Welcome on Api Page !</h1>
        </div>
    )
};

export default Api;
*/