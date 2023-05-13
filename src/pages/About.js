import { Field, Form, Formik } from "formik";
import { useId } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';

const About = () => {

    const id = useId();
    const { name } = useParams();  // Pour récupérer le name ecrit dans l'URL (lié à la ligne 28 de index.js)
    
    const navigate = useNavigate(); // Pour gérer un bouton qui
    const handleClick = () =>{      // renvoi à la page d'accueil "Go to home !"
        navigate('/');
    };

    // Avec Yup (npmjs.com/package/yup) pour contrôler la validation du/des formulaire(s). Ne pas oublier de l'importer !
    const contacFormSchema = Yup.object().shape({
        firstname: Yup.string().required('Ce champs est requis !'),
        lastname: Yup.string().required('Ce champs est requis !'),
        email: Yup.string().email('Format d\'email invalide !').required('Ce champs est requis !'),
        message: Yup.string().max(50, 'Trop long !!!'),
    });

    const handleSubmitForm = (value) => {
        console.log(value);
    };

    return (
        <div>
            <h1>Welcome { name ? name : 'on About Page' } !</h1>
            <button onClick={ handleClick }>Go to home !</button>

            <Formik              //--> Formik est un constructeur de formulaire avec une très bonne gestion des erreurs. Ne pas oublier de l'importer (ainsi que Field et Form) !
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                message: ''
            }}
            onSubmit={ handleSubmitForm }
            validationSchema={ contacFormSchema }
            >
                {
                    ({ errors, touched }) => (      // --> cet objet est le callback de Formik. On sait si l'utilisateur a touché l'objet et si il l'a bien documenté.
                                                    //  ({ errors, touched, values, handleChange, handleSubmit.... }) On a plein de possibilités (voir formik.org/docs/overview) !!!
                        <Form>
                        <div>
                            <label htmlFor={`${id}-firstname`}>Firstname</label>
                            <Field type='text' id={`${id}-firstname`} placeholder='Ex: John' name='firstname' />
                            { errors.firstname && touched.firstname && <p style={{ color: 'red' }}>{ errors.firstname }</p> }
                        </div>
                        <div>
                            <label htmlFor={`${id}-lastname`}>Lastname</label>
                            <Field type='text' id={`${id}-lastname`} placeholder='Ex: DOE' name='lastname' />
                            { errors.lastname && touched.lastname && <p style={{ color: 'red' }}>{ errors.lastname }</p> }
                        </div>
                        <div>
                            <label htmlFor={`${id}-email`}>Email</label>
                            <Field type='text' id={`${id}-email`} placeholder='Ex: example@example.com' name='email' />
                            { errors.email && touched.email && <p style={{ color: 'red' }}>{ errors.email }</p> }
                        </div>
                        <div>
                            <label htmlFor={`${id}-message`}>Message</label>
                            <Field component='textarea' id={`${id}-message`} placeholder='Write your message here...' name='message' />
                            { errors.message && touched.message && <p style={{ color: 'red' }}>{ errors.message }</p> }
                        </div>
    
                        <button type="submit">Submit</button>
                    </Form>
                    )
                }

            </Formik>
        </div>
    )
};

export default About;