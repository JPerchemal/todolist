import { useEffect, useId } from 'react';
import useFieldError from '../../../Hooks/useFieldError';
import style from './Field.module.css';

const TextareaField = ({ label, name, placeholder, validation, value, onChange, onError }) => {

    const id = useId();

    // useFieldError est un hook que l'on a créé pour gérer toutes les erreurs lors du remplissage des champs.
    const { error, validateField } = useFieldError();

    const handleChange = (event) => {
        const { value } = event.target;
        onChange(value);
    };

    useEffect(() => {                       // gère la validation du champ en fonction des màj de value
        validateField(value, validation);
    }, [ value ]);

    useEffect(() => {                       // se déclenche au chargement du composant
        onError({ name, error });           // Execute onError (au chargement l'error est à null donc pas grave)
    }, [ error, name ]);                    // name (récupère le nom du champs où il y a l'error et l'error)
    
    return (
    
        <div className={ style['input-group'] }>
            <label htmlFor={ id }>{ label }</label>
            <textarea type="text" rows={ 5 } name={ name } className={ style.input } placeholder={ placeholder } value={ value } onChange={ handleChange }/>
            { error && <p className={ style.error }>{ error }</p>}
        </div>
    );
};

export default TextareaField;