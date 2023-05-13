import PropTypes from 'prop-types';

const PageTitle = ({ count, title }) => {

    return (
        <h2>{ count } { title }</h2>
    )
};

export default PageTitle;

// Gestion des PropTypes !

PageTitle.propTypes = {
    count: PropTypes.number.isRequired,
    // title: PropTypes.string.isRequired,
    title: PropTypes.string
};

// isRequired n'est pas obligatoire (voir title au-dessus).
// On peut aussi mettre une valeur par defaut comme ci-dessous.
// La recommandation c'est de faire soit l'un soit l'autre.

PageTitle.defaultProps = {
    title: 'Test !!!!',
};