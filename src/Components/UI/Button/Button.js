import style from './Button.module.css';

const Button = ({ type = 'button', variant = 'primary', onClick, children }) => {

    return (
        <button type={ type } onClick={ onClick } className={`${style.btn} ${style[variant]}`}>
            { children }
        </button>
    );
};

export default Button;



/* Sans Props déstructurées :
const Button = (props) => {
    return (
        <button type={props.type ? props.type : 'button'} onClick={props.onClick} className={`${style.btn} ${style[props.variant ? props.variant : 'primary']}`}>
            {props.children}
        </button>
    );
};*/