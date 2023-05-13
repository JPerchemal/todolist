import { useContext, useState } from "react";
import { TasksContext } from "../../../Contexts/TasksContext";
import Button from "../../../Components/UI/Button/Button";
import TextareaField from "../../../Components/UI/Forms/TextareaField";
import TextField from "../../../Components/UI/Forms/TextField";
import PropTypes from 'prop-types';
import { addTask, editTask } from "../../../store/TasksSlice";
import { useDispatch } from "react-redux";

const TaskForm = ({ closeModal, value, index }) => {

    const [ formValue, setFormValue ] = useState(value ? value : {
        title: '',
        description: '',
    });

    const [ invalidFields, setInvalidFields ] = useState([]);

    // const { addTask, editTask } = useContext(TasksContext);

    const dispatch = useDispatch();     // gestion des tâches avec Redux

    const handleSubmit = (event) => {
        // Empêcher la soumission / La création d'une tâche s'il y a des erreurs
        event.preventDefault();
        if (invalidFields.length > 0) {
            alert('There are errors in the form.');
            return;
        }

        /*if (value && !isNaN(+index)) { // S'il y a une value en props => Modification
            editTask({ task: formValue, taskIndex: index });
        } else { // Sinon => Création
            addTask({                       // gestion avec contexte des tâches
                ...formValue,
                createdAt: new Date (),
                isDone: false,
            });
        }*/

        if (value && !isNaN(+index)) { // S'il y a une value en props => Modification
            dispatch(editTask({ task: formValue, taskIndex: index }));
        } else { // Sinon => Création
            dispatch(addTask(formValue));   // gestion des tâches avec Redux
        }
        // closeModal vient du composant Task ligne 24. Ne pas oublier de le mettre en tant que props dans la variable TaskForm)
        closeModal();
    };

    const handleError = (error) => {

        const invalidFieldsCopy = [...invalidFields];
        // On récupère l'index d'un éventuel champs invalide enregistré dans le tableau
        const invalidFieldsIndex = invalidFieldsCopy.findIndex(field => field === error.name);

        if (error.error) { // Si une erreur est renvoyée

            if (invalidFieldsIndex === -1) { // Si le champs n'est pas enregistré comme invalide, on l'ajoute au tableau
                setInvalidFields([ ...invalidFieldsCopy, error.name ]);
            };
            // Sinon, il est déjà enregistré, on ne fait rien

        } else { // Si aucune erreur n'est renvoyée

            if (invalidFieldsIndex !== -1) { // Mais que le champs est enregistré comme invalide, on le supprime du tableau
                invalidFieldsCopy.splice(invalidFieldsIndex, 1);
                setInvalidFields(invalidFieldsCopy);
            };
            // Si le champs n'est pas enregistré, on ne fait rien.
        }

    };

    return (
        <form onSubmit={ handleSubmit }>
            <TextField
                name='title'
                placeholder='New task title'
                label='Title'
                value={ formValue.title }
                onChange={ (value) => setFormValue({ ...formValue, title: value }) }
                validation={ {
                    required: true,
                    type: 'string',
                    minLength: 2,
                    maxLength: 25
                } }
                onError={ handleError }
            />
            <TextareaField
                name='description'
                placeholder='Write your description here...'
                label='Description'
                value={ formValue.description }
                onChange={ (value) => setFormValue({ ...formValue, description: value }) }
                validation={ {
                    required: false,
                    type: 'string',
                    maxLength: 100
                } }
                onError={ handleError }
            />
            <Button type='submit' >Save</Button>

        </form>
    );
};

export default TaskForm;

// Gestion des PropTypes (avec plusieurs exemples) !

TaskForm.propTypes = {
    closeModal: PropTypes.func.isRequired,

    // value: PropTypes.object, ---> on attend un object

    // value: PropTypes.any,    ---> avec any on peut avoir string, number, array... A EVITER !!!

    //value: PropTypes.oneOfType([  --> on attend une string ou un number
    //    PropTypes.string,
    //    PropTypes.number
    //]),

    value: PropTypes.shape({        // shape = forme d'objet. On lui passe la strutue de l'objet
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),

    index: PropTypes.number,
};

// Value et index ne sont pas requis car on se base sur leur état pour savoir
// si on est en mode edition ou création (voir le handlSubmit)
// donc on met "null" comme valeur par défaut
// Mais si on a une value alors title et description sont requis (voir le shape au-dessus)
TaskForm.defaultProps = {
    value: null,
    index: null,
};