import { sendGetRequest } from "../lib/axios"

const signinUser = () => {
    fetch('/api/auth/signup', {
        method: 'POST',
        body: email,
    })
}

const signupUser = () => {

}

// Là on ne fait pas appel à Axios mais à mon fichier qui lui fait appelle à Axios.
// Si jamais Axios change je n'ai pas besoin de tout changer mais juste le fichier lib/axios.
// C'est comme une surcouche qui aide à la maintenance du site.
// Le dossier lib sert à rajouter une interface par dessus les librairies pour créer une séparation entre le métier de notre applcation et nos librairies !!!

const getCurrentUser = () => {
    sendGetRequest('/api/auth/current').then();
}

export { signinUser, signupUser };